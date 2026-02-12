package uz.robotronix.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "SEO Meta", description = "Endpoints for managing search engine optimization metadata")
public class SeoMetaController {

    private final SeoMetaRepository seoMetaRepository;

    // Public endpoint
    @GetMapping("/seo")
    @Operation(summary = "Get SEO meta for a path", description = "Returns SEO metadata (title, keywords, description) for a specific website path/URL")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully retrieved SEO meta"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "SEO meta not found")
    })
    public ResponseEntity<SeoMeta> getSeoMeta(@RequestParam String path) {
        return seoMetaRepository.findByPagePath(path)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Admin endpoints
    @GetMapping("/admin/seo")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    @Operation(summary = "Get all SEO meta entries", description = "Admin only. Returns all configured SEO metadata entries")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully retrieved SEO meta entries"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Access denied")
    })
    public ResponseEntity<List<SeoMeta>> getAllSeoMeta() {
        return ResponseEntity.ok(seoMetaRepository.findAll());
    }

    @PostMapping("/admin/seo")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    @CacheEvict(value = "seo", allEntries = true)
    @Operation(summary = "Create SEO meta entry", description = "Admin only. Creates new SEO settings for a specific path")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully created SEO meta"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "SEO meta for path already exists or invalid data"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Access denied")
    })
    public ResponseEntity<SeoMeta> createSeoMeta(@RequestBody SeoMeta seoMeta) {
        if (seoMetaRepository.findByPagePath(seoMeta.getPagePath()).isPresent()) {
            throw new RuntimeException("SEO meta for this path already exists");
        }
        return ResponseEntity.ok(seoMetaRepository.save(seoMeta));
    }

    @PutMapping("/admin/seo/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    @CacheEvict(value = "seo", allEntries = true)
    @Operation(summary = "Update SEO meta entry", description = "Admin only. Updates existing SEO settings by ID")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully updated SEO meta"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Access denied"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "SEO meta not found")
    })
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
    @Operation(summary = "Delete SEO meta entry", description = "Admin only. Removes SEO settings for a path")
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "204", description = "Successfully deleted SEO meta"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Access denied"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "SEO meta not found")
    })
    public ResponseEntity<Void> deleteSeoMeta(@PathVariable Long id) {
        seoMetaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
