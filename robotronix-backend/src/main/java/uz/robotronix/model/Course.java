package uz.robotronix.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "courses")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Course entity representing an educational program")
public class Course implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique identifier of the course", example = "1")
    private Long id;

    @Column(nullable = false)
    @Schema(description = "Title of the course", example = "Robototexnika Asoslari")
    private String title;

    @Column(columnDefinition = "TEXT")
    @Schema(description = "Detailed description of what the course covers")
    private String description;

    @Schema(description = "Target age group for the course", example = "7-12")
    private String ageGroup;

    @Schema(description = "Duration of the course", example = "3 oy")
    private String duration;

    @Schema(description = "Price of the course", example = "500000.00")
    private BigDecimal price;

    @Schema(description = "URL of the course cover image")
    private String imageUrl;

    @Schema(description = "Target audience category", example = "kids")
    private String category; // 'kids' or 'teachers'

    @Builder.Default
    private boolean isActive = true;

    @Column(updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
