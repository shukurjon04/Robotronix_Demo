package uz.robotronix.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uz.robotronix.dto.ContactDto;
import uz.robotronix.model.ContactMessage;
import uz.robotronix.repository.ContactMessageRepository;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
@Tag(name = "Contact", description = "Endpoints for course enrollment requests and messages")
public class ContactController {

        private final ContactMessageRepository contactMessageRepository;

        @PostMapping
        @Operation(summary = "Submit contact form", description = "Processes a new message or enrollment request from the public site")
        @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
                        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Successfully submitted message"),
                        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid contact data")
        })
        public ResponseEntity<Map<String, String>> submitContactForm(
                        @Valid @RequestBody ContactDto request) {
                ContactMessage message = ContactMessage.builder()
                                .name(request.getName())
                                .phone(request.getPhone())
                                .course(request.getCourse())
                                .message(request.getMessage())
                                .build();

                contactMessageRepository.save(message);

                return ResponseEntity.ok(Map.of(
                                "status", "success",
                                "message", "Xabar muvaffaqiyatli yuborildi!"));
        }
}
