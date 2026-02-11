package uz.robotronix.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import uz.robotronix.model.SeoMeta;
import uz.robotronix.repository.SeoMetaRepository;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SeoMetaController {

    private final SeoMetaRepository seoMetaRepository;

    // Public endpoint
    @GetMapping("/seo")
    public ResponseEntity<SeoMeta> getSeoMeta(@RequestParam String path) {
        return seoMetaRepository.findByPagePath(path)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Admin endpoints
    @GetMapping("/admin/seo")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<List<SeoMeta>> getAllSeoMeta() {
        return ResponseEntity.ok(seoMetaRepository.findAll());
    }

    @PostMapping("/admin/seo")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    @CacheEvict(value = "seo", allEntries = true)
    public ResponseEntity<SeoMeta> createSeoMeta(@RequestBody SeoMeta seoMeta) {
        if (seoMetaRepository.findByPagePath(seoMeta.getPagePath()).isPresent()) {
            throw new RuntimeException("SEO meta for this path already exists");
        }
        return ResponseEntity.ok(seoMetaRepository.save(seoMeta));
    }

    @PutMapping("/admin/seo/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    @CacheEvict(value = "seo", allEntries = true)
    public ResponseEntity<SeoMeta> updateSeoMeta(@PathVariable Long id, @RequestBody SeoMeta seoDetails) {
        SeoMeta seoMeta = seoMetaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("SEO meta not found"));

        seoMeta.setTitle(seoDetails.getTitle());
        seoMeta.setDescription(seoDetails.getDescription());
        seoMeta.setKeywords(seoDetails.getKeywords());
        seoMeta.setOgImage(seoDetails.getOgImage());
        // pagePath should typically not be changed, or carefully handled

        return ResponseEntity.ok(seoMetaRepository.save(seoMeta));
    }

    @DeleteMapping("/admin/seo/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    @CacheEvict(value = "seo", allEntries = true)
    public ResponseEntity<Void> deleteSeoMeta(@PathVariable Long id) {
        seoMetaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
