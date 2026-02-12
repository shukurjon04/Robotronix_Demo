package uz.robotronix.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "banners")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Banner entity for website display")
public class Banner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique identifier of the banner", example = "1")
    private Long id;

    @Column(nullable = false)
    @Schema(description = "Title of the banner", example = "Yangiliklar va Chegirmalar")
    private String title;

    @Column(columnDefinition = "TEXT")
    @Schema(description = "Detailed description of the banner content")
    private String description;

    @Schema(description = "URL of the banner image", example = "/uploads/images/banner1.jpg")
    private String imageUrl;

    @Schema(description = "Click-through URL for the banner", example = "/courses/robotics-101")
    private String linkUrl;

    @Column(nullable = false)
    @Schema(description = "Placement of the banner on the site", example = "home-top")
    private String position; // hero, sidebar, footer

    @Builder.Default
    @Schema(description = "Whether the banner is currently visible")
    private boolean isActive = true;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    @Column(updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
