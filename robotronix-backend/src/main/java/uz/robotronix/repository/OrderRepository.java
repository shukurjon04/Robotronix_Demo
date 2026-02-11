package uz.robotronix.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uz.robotronix.model.Order;
import uz.robotronix.model.User;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserOrderByCreatedAtDesc(User user);

    List<Order> findAllByOrderByCreatedAtDesc();
}
