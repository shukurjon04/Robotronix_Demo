package uz.robotronix.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import uz.robotronix.dto.OrderRequest;
import uz.robotronix.model.Order;
import uz.robotronix.model.User;
import uz.robotronix.service.OrderService;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> createOrder(
            @AuthenticationPrincipal User user,
            @RequestBody OrderRequest request) {
        return ResponseEntity.ok(orderService.createOrder(user, request));
    }

    @GetMapping("/my")
    public ResponseEntity<List<Order>> getMyOrders(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(orderService.getMyOrders(user));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Order> updateStatus(
            @PathVariable Long id,
            @RequestParam Order.Status status) {
        return ResponseEntity.ok(orderService.updateStatus(id, status));
    }
}
