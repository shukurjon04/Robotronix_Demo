package uz.robotronix.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "enrollments")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Enrollment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;
    
    @Enumerated(EnumType.STRING)
    @Builder.Default
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
