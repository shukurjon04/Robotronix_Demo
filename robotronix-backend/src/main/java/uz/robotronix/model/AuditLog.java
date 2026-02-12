package uz.robotronix.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "System audit log entry for admin actions")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Log entry ID", example = "101")
    private Long id;

    @Column(nullable = false)
    @Schema(description = "Email of the admin who performed the action", example = "admin@robotronix.uz")
    private String adminEmail;

    @Column(nullable = false)
    @Schema(description = "The specific action performed", example = "CREATE_COURSE")
    private String action; // e.g., "CREATE_COURSE", "UPDATE_PRODUCT", "DELETE_MESSAGE"

    @Column(columnDefinition = "TEXT")
    @Schema(description = "Detailed JSON or text description of the change")
    private String details; // JSON or string description of what changed

    @Column(nullable = false)
    @Schema(description = "Type of resource affected", example = "COURSE")
    private String resourceType; // e.g., "COURSE", "PRODUCT", "MESSAGE", "ORDER"

    @Schema(description = "Internal ID of the affected resource", example = "1")
    private Long resourceId;

    @Column(updatable = false)
    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();
}
