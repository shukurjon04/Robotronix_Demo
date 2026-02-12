package uz.robotronix.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {
    @io.swagger.v3.oas.annotations.media.Schema(description = "Error message", example = "Invalid input data")
    private String message;

    @io.swagger.v3.oas.annotations.media.Schema(description = "HTTP status code", example = "400")
    private int status;

    @io.swagger.v3.oas.annotations.media.Schema(description = "Timestamp of the error", example = "2024-03-20T10:30:15")
    private LocalDateTime timestamp;

    @io.swagger.v3.oas.annotations.media.Schema(description = "Detailed validation errors (field -> error message)", example = "{\"email\": \"Email format is invalid\"}")
    private Map<String, String> errors;
}
