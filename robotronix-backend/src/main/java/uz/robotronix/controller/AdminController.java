package uz.robotronix.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import uz.robotronix.model.*;
import uz.robotronix.repository.*;
import uz.robotronix.service.AuditLogService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
@Tag(name = "Admin", description = "Endpoints for administrative tasks and data management")
public class AdminController {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final ProductRepository productRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final ContactMessageRepository contactMessageRepository;
    private final OrderRepository orderRepository;
    private final AuditLogService auditLogService;

    // Dashboard Stats
    @GetMapping("/stats")
    @Operation(summary = "Get dashboard statistics", description = "Returns counts for users, courses, products, enrollments, and orders")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully retrieved statistics"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Access denied")
    })
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalCourses", courseRepository.count());
        stats.put("totalProducts", productRepository.count());
        stats.put("totalEnrollments", enrollmentRepository.count());
        stats.put("unreadMessages", contactMessageRepository.countByIsReadFalse());
        stats.put("totalOrders", orderRepository.count());
        return ResponseEntity.ok(stats);
    }

    // Audit Logs
    @GetMapping("/audit-logs")
    @Operation(summary = "Get audit logs", description = "Returns a history of administrative actions")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully retrieved logs"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Access denied")
    })
    public ResponseEntity<List<AuditLog>> getAuditLogs() {
        return ResponseEntity.ok(auditLogService.getAllLogs());
    }

    // User Management
    @GetMapping("/users")
    @Operation(summary = "Get all users", description = "Returns a list of all registered users")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully retrieved users"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Access denied")
    })
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PutMapping("/users/{id}/role")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @Operation(summary = "Update user role", description = "Superadmin only. Updates a user's role (e.g., to ADMIN)")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully updated user role"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Access denied (Super Admin only)"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "User not found")
    })
    public ResponseEntity<User> updateUserRole(
            @PathVariable Long id,
            @RequestBody Map<String, String> request,
            @org.springframework.security.core.annotation.AuthenticationPrincipal User admin) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole(Role.valueOf(request.get("role")));
        User savedUser = userRepository.save(user);
        auditLogService.log(admin.getEmail(), "UPDATE_USER_ROLE", "USER", user.getId(), "New role: " + user.getRole());
        return ResponseEntity.ok(savedUser);
    }

    // Course Management
    @PostMapping("/courses")
    @CacheEvict(value = "courses", allEntries = true)
    @Operation(summary = "Create a course", description = "Adds a new course to the catalog")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully created course"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid course data"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Access denied")
    })
    public ResponseEntity<Course> createCourse(@RequestBody Course course,
            @org.springframework.security.core.annotation.AuthenticationPrincipal User admin) {
        Course savedCourse = courseRepository.save(course);
        auditLogService.log(admin.getEmail(), "CREATE_COURSE", "COURSE", savedCourse.getId(), savedCourse.getTitle());
        return ResponseEntity.ok(savedCourse);
    }

    @PutMapping("/courses/{id}")
    @CacheEvict(value = "courses", allEntries = true)
    @Operation(summary = "Update a course", description = "Updates details of an existing course")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully updated course"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Access denied"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Course not found")
    })
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody Course courseDetails,
            @org.springframework.security.core.annotation.AuthenticationPrincipal User admin) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        course.setTitle(courseDetails.getTitle());
        course.setDescription(courseDetails.getDescription());
        course.setAgeGroup(courseDetails.getAgeGroup());
        course.setDuration(courseDetails.getDuration());
        course.setPrice(courseDetails.getPrice());
        course.setImageUrl(courseDetails.getImageUrl());
        course.setCategory(courseDetails.getCategory());

        Course savedCourse = courseRepository.save(course);
        auditLogService.log(admin.getEmail(), "UPDATE_COURSE", "COURSE", savedCourse.getId(), savedCourse.getTitle());
        return ResponseEntity.ok(savedCourse);
    }

    @DeleteMapping("/courses/{id}")
    @CacheEvict(value = "courses", allEntries = true)
    @Operation(summary = "Delete a course", description = "Removes a course from the catalog")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "204", description = "Successfully deleted course"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Access denied"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Course not found")
    })
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id,
            @org.springframework.security.core.annotation.AuthenticationPrincipal User admin) {
        courseRepository.deleteById(id);
        auditLogService.log(admin.getEmail(), "DELETE_COURSE", "COURSE", id, "Course deleted");
        return ResponseEntity.noContent().build();
    }

    // Product Management
    @PostMapping("/products")
    @CacheEvict(value = "products", allEntries = true)
    @Operation(summary = "Create a product", description = "Adds a new product/kit to the catalog")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully created product"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid product data"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Access denied")
    })
    public ResponseEntity<Product> createProduct(@RequestBody Product product,
            @org.springframework.security.core.annotation.AuthenticationPrincipal User admin) {
        Product savedProduct = productRepository.save(product);
        auditLogService.log(admin.getEmail(), "CREATE_PRODUCT", "PRODUCT", savedProduct.getId(),
                savedProduct.getTitle());
        return ResponseEntity.ok(savedProduct);
    }

    @PutMapping("/products/{id}")
    @CacheEvict(value = "products", allEntries = true)
    @Operation(summary = "Update a product", description = "Updates details of an existing product")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully updated product"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Access denied"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Product not found")
    })
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails,
            @org.springframework.security.core.annotation.AuthenticationPrincipal User admin) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setTitle(productDetails.getTitle());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setOldPrice(productDetails.getOldPrice());
        product.setImageUrl(productDetails.getImageUrl());
        product.setFeatures(productDetails.getFeatures());
        product.setBadge(productDetails.getBadge());

        Product savedProduct = productRepository.save(product);
        auditLogService.log(admin.getEmail(), "UPDATE_PRODUCT", "PRODUCT", savedProduct.getId(),
                savedProduct.getTitle());
        return ResponseEntity.ok(savedProduct);
    }

    @DeleteMapping("/products/{id}")
    @CacheEvict(value = "products", allEntries = true)
    @Operation(summary = "Delete a product", description = "Removes a product from the catalog")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "204", description = "Successfully deleted product"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Access denied"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Product not found")
    })
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id,
            @org.springframework.security.core.annotation.AuthenticationPrincipal User admin) {
        productRepository.deleteById(id);
        auditLogService.log(admin.getEmail(), "DELETE_PRODUCT", "PRODUCT", id, "Product deleted");
        return ResponseEntity.noContent().build();
    }

    // Message Management
    @GetMapping("/messages")
    @Operation(summary = "Get all messages", description = "Returns all contact form submissions")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully retrieved messages"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Access denied")
    })
    public ResponseEntity<List<ContactMessage>> getAllMessages() {
        return ResponseEntity.ok(contactMessageRepository.findAll());
    }

    @PutMapping("/messages/{id}/read")
    @Operation(summary = "Mark message as read", description = "Updates a message's read status")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully updated message status"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Access denied"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Message not found")
    })
    public ResponseEntity<ContactMessage> markMessageAsRead(@PathVariable Long id,
            @org.springframework.security.core.annotation.AuthenticationPrincipal User admin) {
        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Message not found"));
        message.setRead(true);
        ContactMessage savedMessage = contactMessageRepository.save(message);
        auditLogService.log(admin.getEmail(), "READ_MESSAGE", "MESSAGE", savedMessage.getId(),
                "Message from " + message.getName());
        return ResponseEntity.ok(savedMessage);
    }

    @DeleteMapping("/messages/{id}")
    @Operation(summary = "Delete a message", description = "Removes a contact message")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "204", description = "Successfully deleted message"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Access denied"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Message not found")
    })
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id,
            @org.springframework.security.core.annotation.AuthenticationPrincipal User admin) {
        contactMessageRepository.deleteById(id);
        auditLogService.log(admin.getEmail(), "DELETE_MESSAGE", "MESSAGE", id, "Message deleted");
        return ResponseEntity.noContent().build();
    }

    // Enrollment Management
    @GetMapping("/enrollments")
    @Operation(summary = "Get all enrollments", description = "Returns all course enrollments")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully retrieved enrollments"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Access denied")
    })
    public ResponseEntity<List<Enrollment>> getAllEnrollments() {
        return ResponseEntity.ok(enrollmentRepository.findAll());
    }

    @PutMapping("/enrollments/{id}/status")
    @Operation(summary = "Update enrollment status", description = "Changes the status of a course enrollment (e.g., PENDING to COMPLETED)")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully updated enrollment status"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid status"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Access denied"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Enrollment not found")
    })
    public ResponseEntity<Enrollment> updateEnrollmentStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request,
            @org.springframework.security.core.annotation.AuthenticationPrincipal User admin) {
        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));
        enrollment.setStatus(Enrollment.EnrollmentStatus.valueOf(request.get("status")));
        Enrollment savedEnrollment = enrollmentRepository.save(enrollment);
        auditLogService.log(admin.getEmail(), "UPDATE_ENROLLMENT_STATUS", "ENROLLMENT", savedEnrollment.getId(),
                "Status: " + savedEnrollment.getStatus());
        return ResponseEntity.ok(savedEnrollment);
    }

    // Order Management
    @GetMapping("/orders")
    @Operation(summary = "Get all orders", description = "Returns all product orders")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully retrieved orders"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Access denied")
    })
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderRepository.findAll());
    }

    @PutMapping("/orders/{id}/status")
    @Operation(summary = "Update order status", description = "Changes the status of a product order")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully updated order status"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid status"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Access denied"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Order not found")
    })
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request,
            @org.springframework.security.core.annotation.AuthenticationPrincipal User admin) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(Order.Status.valueOf(request.get("status")));
        Order savedOrder = orderRepository.save(order);
        auditLogService.log(admin.getEmail(), "UPDATE_ORDER_STATUS", "ORDER", savedOrder.getId(),
                "Status: " + savedOrder.getStatus());
        return ResponseEntity.ok(savedOrder);
    }

    // Export Data
    @GetMapping(value = "/leads/export", produces = "text/csv")
    @Operation(summary = "Export leads as CSV", description = "Generates and returns a CSV file of all contact messages")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully exported leads (CSV download)"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Access denied")
    })
    public ResponseEntity<String> exportLeads(
            @org.springframework.security.core.annotation.AuthenticationPrincipal User admin) {
        List<ContactMessage> messages = contactMessageRepository.findAll();
        StringBuilder csv = new StringBuilder();
        csv.append("ID,Name,Phone,Course,Message,Date\n");

        for (ContactMessage msg : messages) {
            csv.append(msg.getId()).append(",")
                    .append(escapeCsv(msg.getName())).append(",")
                    .append(escapeCsv(msg.getPhone())).append(",")
                    .append(escapeCsv(msg.getCourse())).append(",")
                    .append(escapeCsv(msg.getMessage())).append(",")
                    .append(msg.getCreatedAt()).append("\n");
        }

        auditLogService.log(admin.getEmail(), "EXPORT_LEADS", "LEADS", null, "Leads CSV exported");
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=leads.csv")
                .body(csv.toString());
    }

    private String escapeCsv(String data) {
        if (data == null)
            return "";
        String escapedData = data.replaceAll("\\R", " ");
        if (data.contains(",") || data.contains("\"") || data.contains("'")) {
            data = data.replace("\"", "\"\"");
            escapedData = "\"" + data + "\"";
        }
        return escapedData;
    }
}
