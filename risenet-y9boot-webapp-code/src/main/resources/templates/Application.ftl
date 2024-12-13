package net.risesoft;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import net.risesoft.y9.configuration.Y9Properties;

/**
 * @author ${codeSystem.isvName}
 * @date ${.now?string('yyyy-MM-dd')}
 */
@SpringBootApplication
@EnableConfigurationProperties(Y9Properties.class)
public class ${codeSystem.name?cap_first}Application {

    public static void main(String[] args) {
        SpringApplication.run(${codeSystem.name?cap_first}Application.class, args);
    }
}