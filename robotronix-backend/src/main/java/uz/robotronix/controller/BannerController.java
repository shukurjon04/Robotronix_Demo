package uz.robotronix.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import uz.robotronix.model.Banner;
import uz.robotronix.repository.BannerRepository;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class BannerController {

    private final BannerRepository bannerRepository;

    // Public endpoints
    @GetMapping("/banners")
    @Cacheable(value = "banners", key = "'all'")
    public ResponseEntity<List<Banner>> getAllActiveBanners() {
        return ResponseEntity.ok(bannerRepository.findByIsActiveTrue());
    }

    @GetMapping("/banners/{position}")
    @Cacheable(value = "banners", key = "#position")
    public ResponseEntity<List<Banner>> getBannersByPosition(@PathVariable String position) {
        return ResponseEntity.ok(bannerRepository.findByIsActiveTrueAndPositionOrderByCreatedAtDesc(position));
    }

    // Admin endpoints
    @PostMapping("/admin/banners")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    @CacheEvict(value = "banners", allEntries = true)
    public ResponseEntity<Banner> createBanner(@RequestBody Banner banner) {
        return ResponseEntity.ok(bannerRepository.save(banner));
    }

    @PutMapping("/admin/banners/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    @CacheEvict(value = "banners", allEntries = true)
    public ResponseEntity<Banner> updateBanner(@PathVariable Long id, @RequestBody Banner bannerDetails) {
        Banner banner = bannerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Banner not found"));

        banner.setTitle(bannerDetails.getTitle());
        banner.setDescription(bannerDetails.getDescription());
        banner.setImageUrl(bannerDetails.getImageUrl());
        banner.setLinkUrl(bannerDetails.getLinkUrl());
        banner.setPosition(bannerDetails.getPosition());
        banner.setActive(bannerDetails.isActive());
        banner.setStartDate(bannerDetails.getStartDate());
        banner.setEndDate(bannerDetails.getEndDate());

        return ResponseEntity.ok(bannerRepository.save(banner));
    }

    @DeleteMapping("/admin/banners/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    @CacheEvict(value = "banners", allEntries = true)
    public ResponseEntity<Void> deleteBanner(@PathVariable Long id) {
        bannerRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
