package uz.robotronix;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class RobotronixApplication {
    public static void main(String[] args) {
        SpringApplication.run(RobotronixApplication.class, args);
    }
}
