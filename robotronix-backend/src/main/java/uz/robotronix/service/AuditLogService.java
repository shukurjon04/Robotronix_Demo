package uz.robotronix.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uz.robotronix.model.AuditLog;
import uz.robotronix.repository.AuditLogRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public void log(String adminEmail, String action, String resourceType, Long resourceId, String details) {
        AuditLog log = AuditLog.builder()
                .adminEmail(adminEmail)
                .action(action)
                .resourceType(resourceType)
                .resourceId(resourceId)
                .details(details)
                .timestamp(LocalDateTime.now())
                .build();
        auditLogRepository.save(log);
    }

    public List<AuditLog> getAllLogs() {
        return auditLogRepository.findAllByOrderByTimestampDesc();
    }
}
