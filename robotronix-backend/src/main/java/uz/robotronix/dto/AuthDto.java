package uz.robotronix.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class AuthDto {

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RegisterRequest {
        @NotBlank(message = "Ism majburiy")
        private String fullName;

        @NotBlank(message = "Email majburiy")
        @Email(message = "Email formati noto'g'ri")
        private String email;

        @NotBlank(message = "Parol majburiy")
        @Size(min = 6, message = "Parol kamida 6 ta belgidan iborat bo'lishi kerak")
        private String password;

        private String phone;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class LoginRequest {
        @NotBlank(message = "Email majburiy")
        @Email(message = "Email formati noto'g'ri")
        private String email;

        @NotBlank(message = "Parol majburiy")
        private String password;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AuthResponse {
        private String token;
        private UserDto user;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserDto {
        private Long id;
        private String fullName;
        private String email;
        private String phone;
        private String role;
    }
}
