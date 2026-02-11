package uz.robotronix.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import uz.robotronix.model.ContactMessage;
import uz.robotronix.model.Enrollment;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class TelegramService {

    @Value("${telegram.bot-token}")
    private String botToken;

    @Value("${telegram.chat-id}")
    private String chatId;

    @Value("${telegram.enabled:false}")
    private boolean enabled;

    private final RestTemplate restTemplate = new RestTemplate();

    @Async
    public void sendMessage(String message) {
        if (!enabled || botToken == null || botToken.isEmpty() || chatId == null || chatId.isEmpty()) {
            log.warn("Telegram notifications are disabled or not configured properly");
            return;
        }

        try {
            String url = "https://api.telegram.org/bot" + botToken + "/sendMessage";
            Map<String, Object> request = new HashMap<>();
            request.put("chat_id", chatId);
            request.put("text", message);
            request.put("parse_mode", "HTML");

            restTemplate.postForEntity(url, request, String.class);
            log.info("Telegram message sent successfully");
        } catch (Exception e) {
            log.error("Failed to send Telegram message", e);
        }
    }

    public void sendNewLeadNotification(ContactMessage message) {
        String text = String.format("""
                🔵 <b>Yangi Xabar</b>

                👤 <b>Ism:</b> %s
                📞 <b>Telefon:</b> %s
                📚 <b>Kurs:</b> %s
                💬 <b>Xabar:</b> %s
                """,
                message.getName(),
                message.getPhone(),
                message.getCourse() != null ? message.getCourse() : "Noma'lum",
                message.getMessage());
        sendMessage(text);
    }

    public void sendNewEnrollmentNotification(Enrollment enrollment) {
        String text = String.format("""
                🟢 <b>Yangi Ariza (Kursga yozilish)</b>

                👤 <b>Ism:</b> %s
                📞 <b>Telefon:</b> %s
                📚 <b>Kurs:</b> %s
                """,
                enrollment.getUser().getFullName(),
                enrollment.getUser().getPhone(),
                enrollment.getCourse().getTitle());
        sendMessage(text);
    }
}
