package uz.robotronix.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Data Transfer Object for submitting contact messages")
public class ContactDto {

    @NotBlank(message = "Ism majburiy")
    @Schema(description = "Full name of the person contacting", example = "Ali Valiyev")
    private String name;

    @NotBlank(message = "Telefon raqam majburiy")
    @Schema(description = "Contact phone number", example = "+998901234567")
    private String phone;

    @Schema(description = "Interested course name", example = "Robotics 101")
    private String course;

    @Schema(description = "The message content", example = "Kurs haqida ma'lumot olmoqchi edim")
    private String message;
}
