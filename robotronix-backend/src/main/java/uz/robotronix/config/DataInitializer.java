package uz.robotronix.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import uz.robotronix.model.*;
import uz.robotronix.repository.*;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        initUsers();
        initCourses();
        initProducts();
        log.info("Database initialized with sample data");
    }

    private void initUsers() {
        if (userRepository.count() == 0) {
            User superAdmin = User.builder()
                    .fullName("Super Admin")
                    .email("superadmin@robotronix.uz")
                    .password(passwordEncoder.encode("admin123"))
                    .phone("+998 33 803 33 53")
                    .role(Role.SUPER_ADMIN)
                    .build();
            userRepository.save(superAdmin);

            User admin = User.builder()
                    .fullName("Admin User")
                    .email("admin@robotronix.uz")
                    .password(passwordEncoder.encode("admin123"))
                    .phone("+998 90 123 45 67")
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(admin);

            log.info("Created default admin users");
        }
    }

    private void initCourses() {
        if (courseRepository.count() == 0) {
            List<Course> courses = List.of(
                    Course.builder()
                            .title("Mitti Muhandis")
                            .description("LEGO Classic va STEAM asosida ijodkorlikni rivojlantirish")
                            .ageGroup("4-6 yosh")
                            .duration("3 oy")
                            .price(new BigDecimal("350000"))
                            .category("kids")
                            .imageUrl("/assets/images/placeholder.svg")
                            .build(),
                    Course.builder()
                            .title("Kichik Muhandis")
                            .description("LEGO WeDo 2.0 yordamida ilk mexanizmlarni yasash")
                            .ageGroup("7-9 yosh")
                            .duration("6 oy")
                            .price(new BigDecimal("450000"))
                            .category("kids")
                            .imageUrl("/assets/images/placeholder.svg")
                            .build(),
                    Course.builder()
                            .title("Yosh Muhandis")
                            .description("Arduino platformasi asosida elektronika va dasturlash")
                            .ageGroup("10-14 yosh")
                            .duration("9 oy")
                            .price(new BigDecimal("550000"))
                            .category("kids")
                            .imageUrl("/assets/images/placeholder.svg")
                            .build(),
                    Course.builder()
                            .title("Dasturlash va AI")
                            .description("Flutter va Python orqali mobil ilovalar va AI")
                            .ageGroup("14+ yosh")
                            .duration("12 oy")
                            .price(new BigDecimal("650000"))
                            .category("kids")
                            .imageUrl("/assets/images/placeholder.svg")
                            .build(),
                    Course.builder()
                            .title("O'qituvchilar kursi")
                            .description("Texnologiya fani o'qituvchilari uchun maxsus kurs")
                            .ageGroup("Kattalar")
                            .duration("2 hafta")
                            .price(new BigDecimal("650000"))
                            .category("teachers")
                            .imageUrl("/assets/images/placeholder.svg")
                            .build());
            courseRepository.saveAll(courses);
            log.info("Created {} sample courses", courses.size());
        }
    }

    private void initProducts() {
        if (productRepository.count() == 0) {
            List<Product> products = List.of(
                    Product.builder()
                            .title("Robokit RMT-4 (Arduino To'plami)")
                            .description("Arduino UNO (DIP versiya), datchiklar, motorlar va barcha kerakli qismlar")
                            .price(new BigDecimal("450000"))
                            .oldPrice(new BigDecimal("520000"))
                            .features(List.of("6-7 sinf uchun", "Kafolat", "O'zbek tilida"))
                            .badge("Mashhur")
                            .imageUrl("/assets/images/placeholder.svg")
                            .build(),
                    Product.builder()
                            .title("5-sinf Maxsus To'plami")
                            .description("Ventilyator, Mayoq, Smart yoritgich va boshqa loyihalar uchun")
                            .price(new BigDecimal("320000"))
                            .features(List.of("5 ta loyiha", "To'liq komplekt", "Qo'llanma"))
                            .badge("Yangi")
                            .imageUrl("/assets/images/placeholder.svg")
                            .build(),
                    Product.builder()
                            .title("LEGO WeDo 2.0")
                            .description("Boshlang'ich sinf o'quvchilari uchun ta'limiy konstruktor")
                            .price(new BigDecimal("1200000"))
                            .features(List.of("7-10 yosh", "Bluetooth", "Mobil ilova"))
                            .imageUrl("/assets/images/placeholder.svg")
                            .build());
            productRepository.saveAll(products);
            log.info("Created {} sample products", products.size());
        }
    }
}
