package uz.robotronix.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Banners", description = "Endpoints for managing website banners")
public class BannerController {

    private final BannerRepository bannerRepository;

    // Public endpoints
    @GetMapping("/banners")
    @Cacheable(value = "banners", key = "'all'")
    @Operation(summary = "Get all active banners", description = "Returns a list of all active banners for the website")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully retrieved banners")
    })
    public ResponseEntity<List<Banner>> getAllActiveBanners() {
        return ResponseEntity.ok(bannerRepository.findByIsActiveTrue());
    }

    @GetMapping("/banners/{position}")
    @Cacheable(value = "banners", key = "#position")
    @Operation(summary = "Get banners by position", description = "Returns active banners for a specific position (e.g., 'home-top')")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully retrieved banners")
    })
    public ResponseEntity<List<Banner>> getBannersByPosition(@PathVariable String position) {
        return ResponseEntity.ok(bannerRepository.findByIsActiveTrueAndPositionOrderByCreatedAtDesc(position));
    }

    // Admin endpoints
    @PostMapping("/admin/banners")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    @CacheEvict(value = "banners", allEntries = true)
    @Operation(summary = "Create a new banner", description = "Admin only. Creates a new banner entry")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully created banner"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid banner data"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Access denied")
    })
    public ResponseEntity<Banner> createBanner(@RequestBody Banner banner) {
        return ResponseEntity.ok(bannerRepository.save(banner));
    }

    @PutMapping("/admin/banners/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    @CacheEvict(value = "banners", allEntries = true)
    @Operation(summary = "Update an existing banner", description = "Admin only. Updates banner details by ID")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully updated banner"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Access denied"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Banner not found")
    })
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
    @Operation(summary = "Delete a banner", description = "Admin only. Removes a banner by ID")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "204", description = "Successfully deleted banner"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Access denied"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Banner not found")
    })
    public ResponseEntity<Void> deleteBanner(@PathVariable Long id) {
        bannerRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
