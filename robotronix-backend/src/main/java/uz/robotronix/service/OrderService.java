package uz.robotronix.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.robotronix.dto.OrderItemRequest;
import uz.robotronix.dto.OrderRequest;
import uz.robotronix.model.Order;
import uz.robotronix.model.OrderItem;
import uz.robotronix.model.Product;
import uz.robotronix.model.User;
import uz.robotronix.repository.OrderRepository;
import uz.robotronix.repository.ProductRepository;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    @Transactional
    public Order createOrder(User user, OrderRequest request) {
        Order order = Order.builder()
                .user(user)
                .shippingAddress(request.getShippingAddress())
                .contactPhone(request.getContactPhone())
                .status(Order.Status.PENDING)
                .items(new ArrayList<>())
                .build();

        BigDecimal totalAmount = BigDecimal.ZERO;

        for (OrderItemRequest itemRequest : request.getItems()) {
            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(itemRequest.getQuantity())
                    .price(product.getPrice())
                    .build();

            order.getItems().add(orderItem);
            totalAmount = totalAmount.add(product.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity())));
        }

        order.setTotalAmount(totalAmount);
        return orderRepository.save(order);
    }

    public List<Order> getMyOrders(User user) {
        return orderRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc();
    }

    public Order updateStatus(Long orderId, Order.Status status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }
}
