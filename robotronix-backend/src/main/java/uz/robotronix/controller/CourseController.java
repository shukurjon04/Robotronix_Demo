package uz.robotronix.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uz.robotronix.model.Course;
import uz.robotronix.repository.CourseRepository;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
@Tag(name = "Courses", description = "Endpoints for browsing and enrolling in courses")
public class CourseController {

    private final CourseRepository courseRepository;

    @GetMapping
    @Operation(summary = "Get all active courses", description = "Returns alphabetical list of available courses")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully retrieved courses")
    })
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(courseRepository.findByIsActiveTrue());
    }

    @GetMapping("/category/{category}")
    @Operation(summary = "Get courses by category", description = "Returns active courses for a specific category")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully retrieved courses")
    })
    public ResponseEntity<List<Course>> getCoursesByCategory(@PathVariable String category) {
        return ResponseEntity.ok(courseRepository.findByCategoryAndIsActiveTrue(category));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get course by ID", description = "Returns detailed information about a course")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully retrieved course"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Course not found")
    })
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        return courseRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/enroll")
    @Operation(summary = "Enroll in a course", description = "Authenticated user registers for a course")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully enrolled"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Already enrolled or invalid request"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Not authenticated"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Course not found")
    })
    public ResponseEntity<uz.robotronix.model.Enrollment> enroll(
            @PathVariable Long id,
            @org.springframework.security.core.annotation.AuthenticationPrincipal uz.robotronix.model.User user,
            @org.springframework.beans.factory.annotation.Autowired uz.robotronix.service.EnrollmentService enrollmentService) {
        return ResponseEntity.ok(enrollmentService.enroll(user, id));
    }

    @GetMapping("/my-enrollments")
    @Operation(summary = "Get my enrollments", description = "Returns a list of courses the authenticated user is enrolled in")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully retrieved enrollments"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Not authenticated")
    })
    public ResponseEntity<List<uz.robotronix.model.Enrollment>> getMyEnrollments(
            @org.springframework.security.core.annotation.AuthenticationPrincipal uz.robotronix.model.User user,
            @org.springframework.beans.factory.annotation.Autowired uz.robotronix.service.EnrollmentService enrollmentService) {
        return ResponseEntity.ok(enrollmentService.getMyEnrollments(user));
    }
}
