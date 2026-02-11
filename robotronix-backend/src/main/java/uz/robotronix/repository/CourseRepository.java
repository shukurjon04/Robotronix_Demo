package uz.robotronix.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uz.robotronix.model.Course;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    @org.springframework.cache.annotation.Cacheable(value = "courses", key = "#category")
    List<Course> findByCategoryAndIsActiveTrue(String category);

    @org.springframework.cache.annotation.Cacheable(value = "courses", key = "'all'")
    List<Course> findByIsActiveTrue();
}
