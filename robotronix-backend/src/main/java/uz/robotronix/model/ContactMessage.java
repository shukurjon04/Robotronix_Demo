package uz.robotronix.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "contact_messages")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContactMessage {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String phone;
    
    private String course;
    
    @Column(columnDefinition = "TEXT")
    private String message;
    
    @Builder.Default
    private boolean isRead = false;
    
    @Column(updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
