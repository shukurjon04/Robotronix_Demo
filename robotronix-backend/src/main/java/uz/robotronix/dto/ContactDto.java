package uz.robotronix.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContactDto {

    @NotBlank(message = "Ism majburiy")
    private String name;

    @NotBlank(message = "Telefon raqam majburiy")
    private String phone;

    private String course;

    private String message;
}
