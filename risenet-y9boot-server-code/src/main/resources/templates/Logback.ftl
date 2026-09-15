<?xml version="1.0" encoding="UTF-8"?>
<configuration>

    <!-- Spring Boot 默认日志格式、颜色转换器等 -->
    <include resource="org/springframework/boot/logging/logback/defaults.xml"/>

    <!-- 控制台和滚动文件输出 -->
    <include resource="org/springframework/boot/logging/logback/console-appender.xml"/>
    <include resource="org/springframework/boot/logging/logback/file-appender.xml"/>

    <logger name="y9" level="DEBUG"/>
    <logger name="net.risesoft" level="DEBUG"/>

    <logger name="com.alibaba.cloud.nacos" level="INFO"/>
    <logger name="com.alibaba.nacos" level="INFO"/>
    <logger name="org.springframework.cloud.endpoint.event" level="INFO"/>

    <logger name="org.hibernate" level="WARN"/>

    <root level="INFO">
        <appender-ref ref="CONSOLE"/>
        <appender-ref ref="FILE"/>
    </root>

</configuration>