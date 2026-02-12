package uz.robotronix.dto;

import io.swagger.v3.oas.annotations.media.Schema;
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
    @Schema(description = "Request body for user registration")
    public static class RegisterRequest {
        @NotBlank(message = "Ism majburiy")
        @Schema(description = "User's full name", example = "Ali Valiyev")
        private String fullName;

        @NotBlank(message = "Email majburiy")
        @Email(message = "Email formati noto'g'ri")
        @Schema(description = "User's email address", example = "ali@example.com")
        private String email;

        @NotBlank(message = "Parol majburiy")
        @Size(min = 6, message = "Parol kamida 6 ta belgidan iborat bo'lishi kerak")
        @Schema(description = "User's password (min 6 chars)", example = "password123")
        private String password;

        @Schema(description = "User's phone number", example = "+998901234567")
        private String phone;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Schema(description = "Request body for user login")
    public static class LoginRequest {
        @NotBlank(message = "Email majburiy")
        @Email(message = "Email formati noto'g'ri")
        @Schema(description = "Registered email address", example = "ali@example.com")
        private String email;

        @NotBlank(message = "Parol majburiy")
        @Schema(description = "User's password", example = "password123")
        private String password;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Schema(description = "Response body after successful authentication")
    public static class AuthResponse {
        @Schema(description = "JWT access token")
        private String token;
        @Schema(description = "Authorized user details")
        private UserDto user;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Schema(description = "Simplified user information")
    public static class UserDto {
        private Long id;
        private String fullName;
        private String email;
        private String phone;
        private String role;
    }
}
