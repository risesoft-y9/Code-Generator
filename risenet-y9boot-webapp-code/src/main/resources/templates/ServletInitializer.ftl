package net.risesoft;

import java.util.Collections;

import javax.servlet.ServletContext;
import javax.servlet.SessionCookieConfig;
import javax.servlet.SessionTrackingMode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.core.env.Environment;
import org.springframework.web.context.WebApplicationContext;

/**
 * @author ${codeSystem.isvName}
 * @date ${.now?string('yyyy-MM-dd')}
 */
public class ${codeSystem.name?cap_first}ServletInitializer extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(final SpringApplicationBuilder builder) {
		return builder.sources(${codeSystem.name?cap_first}Application.class);
	}

    @Override
    protected WebApplicationContext run(SpringApplication application) {
        WebApplicationContext ctx = super.run(application);
        Environment env = ctx.getEnvironment();
        String cookieSecure = env.getProperty("server.servlet.session.cookie.secure", "false");

        ServletContext servletContext = ctx.getServletContext();
        servletContext.setSessionTrackingModes(Collections.singleton(SessionTrackingMode.COOKIE));
        SessionCookieConfig sessionCookieConfig = servletContext.getSessionCookieConfig();
        sessionCookieConfig.setHttpOnly(true);
        sessionCookieConfig.setSecure(Boolean.valueOf(cookieSecure));
        return ctx;
    }
}