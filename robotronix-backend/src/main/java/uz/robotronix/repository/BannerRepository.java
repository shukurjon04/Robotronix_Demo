package uz.robotronix.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.robotronix.model.Banner;

import java.util.List;

public interface BannerRepository extends JpaRepository<Banner, Long> {
    List<Banner> findByIsActiveTrue();

    List<Banner> findByIsActiveTrueAndPositionOrderByCreatedAtDesc(String position);
}
