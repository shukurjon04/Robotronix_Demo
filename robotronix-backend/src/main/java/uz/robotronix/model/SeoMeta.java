package uz.robotronix.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "seo_meta")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "SEO Metadata for a specific website path")
public class SeoMeta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Internal ID", example = "1")
    private Long id;

    @Column(nullable = false, unique = true)
    @Schema(description = "Target website URL path", example = "/courses")
    private String pagePath; // e.g. "/courses", "/about"

    @Schema(description = "Page title tag content", example = "Kurslar | Robotronix")
    private String title;

    @Column(columnDefinition = "TEXT")
    @Schema(description = "Meta description for search results")
    private String description;

    @Column(columnDefinition = "TEXT")
    @Schema(description = "Meta keywords comma separated", example = "robotics, education, kits")
    private String keywords;

    @Schema(description = "URL for OG social media image")
    private String ogImage;

    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
