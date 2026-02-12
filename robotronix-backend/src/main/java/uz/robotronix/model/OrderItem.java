package uz.robotronix.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Individual item within a product order")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique item ID", example = "1")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @Schema(description = "The ordered product")
    private Product product;

    @Schema(description = "Quantity of this product ordered", example = "2")
    private Integer quantity;

    @Schema(description = "Unit price at time of order", example = "250000.00")
    private BigDecimal price; // Price at the time of purchase
}
