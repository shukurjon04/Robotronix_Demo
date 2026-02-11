package uz.robotronix.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uz.robotronix.dto.AuthDto;
import uz.robotronix.exception.ApiException;
import uz.robotronix.model.Role;
import uz.robotronix.model.User;
import uz.robotronix.repository.UserRepository;
import uz.robotronix.security.JwtService;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthDto.AuthResponse register(AuthDto.RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ApiException("Bu email allaqachon ro'yxatdan o'tgan");
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role(Role.USER)
                .build();

        userRepository.save(user);
        String token = jwtService.generateToken(user);

        return AuthDto.AuthResponse.builder()
                .token(token)
                .user(mapToUserDto(user))
                .build();
    }

    public AuthDto.AuthResponse login(AuthDto.LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ApiException("Foydalanuvchi topilmadi"));

        String token = jwtService.generateToken(user);

        return AuthDto.AuthResponse.builder()
                .token(token)
                .user(mapToUserDto(user))
                .build();
    }

    private AuthDto.UserDto mapToUserDto(User user) {
        return AuthDto.UserDto.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole().name())
                .build();
    }
}
