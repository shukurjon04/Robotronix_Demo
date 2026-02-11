package uz.robotronix.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uz.robotronix.model.Product;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @org.springframework.cache.annotation.Cacheable(value = "products", key = "'all'")
    @org.springframework.data.jpa.repository.Query("SELECT DISTINCT p FROM Product p LEFT JOIN FETCH p.features WHERE p.isActive = true")
    List<Product> findByIsActiveTrue();
}
