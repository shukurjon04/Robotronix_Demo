package uz.robotronix.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uz.robotronix.model.Enrollment;

import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByUserId(Long userId);

    List<Enrollment> findByCourseId(Long courseId);

    boolean existsByUserAndCourse(uz.robotronix.model.User user, uz.robotronix.model.Course course);

    List<Enrollment> findByUserOrderByEnrolledAtDesc(uz.robotronix.model.User user);

    List<Enrollment> findAllByOrderByEnrolledAtDesc();
}
