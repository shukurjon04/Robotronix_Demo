package uz.robotronix.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uz.robotronix.model.Course;
import uz.robotronix.repository.CourseRepository;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseRepository courseRepository;

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(courseRepository.findByIsActiveTrue());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Course>> getCoursesByCategory(@PathVariable String category) {
        return ResponseEntity.ok(courseRepository.findByCategoryAndIsActiveTrue(category));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        return courseRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/enroll")
    public ResponseEntity<uz.robotronix.model.Enrollment> enroll(
            @PathVariable Long id,
            @org.springframework.security.core.annotation.AuthenticationPrincipal uz.robotronix.model.User user,
            @org.springframework.beans.factory.annotation.Autowired uz.robotronix.service.EnrollmentService enrollmentService) {
        return ResponseEntity.ok(enrollmentService.enroll(user, id));
    }

    @GetMapping("/my-enrollments")
    public ResponseEntity<List<uz.robotronix.model.Enrollment>> getMyEnrollments(
            @org.springframework.security.core.annotation.AuthenticationPrincipal uz.robotronix.model.User user,
            @org.springframework.beans.factory.annotation.Autowired uz.robotronix.service.EnrollmentService enrollmentService) {
        return ResponseEntity.ok(enrollmentService.getMyEnrollments(user));
    }
}
