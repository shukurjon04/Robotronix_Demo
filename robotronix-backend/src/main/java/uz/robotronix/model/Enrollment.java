package uz.robotronix.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "enrollments")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Enrollment entity linking a user to a course")
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique identifier of the enrollment", example = "1")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @Schema(description = "The user who enrolled")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    @Schema(description = "The course being enrolled in")
    private Course course;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    @Schema(description = "Current status of the enrollment", example = "PENDING")
    private EnrollmentStatus status = EnrollmentStatus.PENDING;

    @Column(updatable = false)
    @Builder.Default
    private LocalDateTime enrolledAt = LocalDateTime.now();

    public enum EnrollmentStatus {
        PENDING,
        CONFIRMED,
        COMPLETED,
        CANCELLED
    }
}
