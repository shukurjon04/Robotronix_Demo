package uz.robotronix.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.robotronix.model.Course;
import uz.robotronix.model.Enrollment;
import uz.robotronix.model.User;
import uz.robotronix.repository.CourseRepository;
import uz.robotronix.repository.EnrollmentRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;

    @Transactional
    public Enrollment enroll(User user, Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (enrollmentRepository.existsByUserAndCourse(user, course)) {
            throw new RuntimeException("You are already enrolled in this course");
        }

        Enrollment enrollment = Enrollment.builder()
                .user(user)
                .course(course)
                .status(Enrollment.EnrollmentStatus.PENDING)
                .build();

        return enrollmentRepository.save(enrollment);
    }

    public List<Enrollment> getMyEnrollments(User user) {
        return enrollmentRepository.findByUserOrderByEnrolledAtDesc(user);
    }

    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAllByOrderByEnrolledAtDesc();
    }

    public Enrollment updateStatus(Long enrollmentId, Enrollment.EnrollmentStatus status) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));
        enrollment.setStatus(status);
        return enrollmentRepository.save(enrollment);
    }
}
