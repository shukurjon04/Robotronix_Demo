package uz.robotronix.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "Request detail for a single product in an order")
public class OrderItemRequest {
    @Schema(description = "ID of the product to buy", example = "1")
    private Long productId;
    @Schema(description = "Number of units to purchase", example = "2")
    private Integer quantity;
}
