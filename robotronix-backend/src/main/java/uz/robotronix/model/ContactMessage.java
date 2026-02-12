package uz.robotronix.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "contact_messages")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Contact message entity from the 'Contact Us' form")
public class ContactMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Internal message ID", example = "1")
    private Long id;

    @Column(nullable = false)
    @Schema(description = "Sender's full name", example = "Ali Valiyev")
    private String name;

    @Column(nullable = false)
    @Schema(description = "Sender's contact phone number", example = "+998901234567")
    private String phone;

    @Schema(description = "Course the user is interested in", example = "Robototexnika")
    private String course;

    @Column(columnDefinition = "TEXT")
    @Schema(description = "The message body content")
    private String message;

    @Builder.Default
    private boolean isRead = false;

    @Column(updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
