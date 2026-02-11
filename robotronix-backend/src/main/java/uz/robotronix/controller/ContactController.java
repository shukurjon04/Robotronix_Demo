package uz.robotronix.controller;

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
public class ContactController {

    private final ContactMessageRepository contactMessageRepository;

    @PostMapping
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
