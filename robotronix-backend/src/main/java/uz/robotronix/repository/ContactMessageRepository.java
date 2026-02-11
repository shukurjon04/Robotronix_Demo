package uz.robotronix.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uz.robotronix.model.ContactMessage;

import java.util.List;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
    List<ContactMessage> findByIsReadFalseOrderByCreatedAtDesc();
    long countByIsReadFalse();
}
