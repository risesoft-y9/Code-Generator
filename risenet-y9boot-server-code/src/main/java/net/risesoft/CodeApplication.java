package net.risesoft;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import net.risesoft.y9.spring.boot.Y9Banner;

@SpringBootApplication
public class CodeApplication {
    public static void main(String[] args) {
        SpringApplication springApplication = new SpringApplication(CodeApplication.class);
        springApplication.setBanner(new Y9Banner());
        springApplication.run(args);
    }
}
