package uz.robotronix.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String adminEmail;

    @Column(nullable = false)
    private String action; // e.g., "CREATE_COURSE", "UPDATE_PRODUCT", "DELETE_MESSAGE"

    @Column(columnDefinition = "TEXT")
    private String details; // JSON or string description of what changed

    @Column(nullable = false)
    private String resourceType; // e.g., "COURSE", "PRODUCT", "MESSAGE", "ORDER"

    private Long resourceId;

    @Column(updatable = false)
    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();
}
