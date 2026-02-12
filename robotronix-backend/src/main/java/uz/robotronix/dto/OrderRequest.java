package uz.robotronix.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import java.util.List;

@Data
@Schema(description = "Request body for placing an order")
public class OrderRequest {
    @Schema(description = "List of products and quantities to order")
    private List<OrderItemRequest> items;
    @Schema(description = "Physical address for delivery", example = "Tashkent, Uzbekistan")
    private String shippingAddress;
    @Schema(description = "Phone number for delivery contact", example = "+998901234567")
    private String contactPhone;
}
