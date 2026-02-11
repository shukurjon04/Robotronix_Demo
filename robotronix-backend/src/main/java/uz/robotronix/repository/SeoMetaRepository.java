package uz.robotronix.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.robotronix.model.SeoMeta;

import java.util.Optional;

public interface SeoMetaRepository extends JpaRepository<SeoMeta, Long> {
    Optional<SeoMeta> findByPagePath(String pagePath);
}
