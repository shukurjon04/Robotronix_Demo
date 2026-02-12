package uz.robotronix.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "products")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Product entity representing a robotics kit or item for sale")
public class Product implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique identifier of the product", example = "1")
    private Long id;

    @Column(nullable = false)
    @Schema(description = "Product name", example = "Arduino Starter Kit")
    private String title;

    @Column(columnDefinition = "TEXT")
    @Schema(description = "Detailed product description")
    private String description;

    @Schema(description = "Current selling price", example = "250000.00")
    private BigDecimal price;

    @Schema(description = "Previous price (for discounts)", example = "300000.00")
    private BigDecimal oldPrice;

    @Schema(description = "URL of the product image")
    private String imageUrl;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_features", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "feature")
    @Schema(description = "List of key features or specifications")
    private List<String> features;

    @Schema(description = "Special badge text (e.g., 'New', 'Sale')", example = "New")
    private String badge;

    @Builder.Default
    private boolean isActive = true;

    @Column(updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
