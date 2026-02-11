package uz.robotronix.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "banners")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Banner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String imageUrl;

    private String linkUrl;

    @Column(nullable = false)
    private String position; // hero, sidebar, footer

    @Builder.Default
    private boolean isActive = true;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    @Column(updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
