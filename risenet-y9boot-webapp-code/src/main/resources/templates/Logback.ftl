<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <include resource="org/springframework/boot/logging/logback/defaults.xml" />

    <contextName>${codeSystem.name?uncap_first}</contextName>

    <property name="LOG_PATH" value="/software/app/logs"/>
    <property name="LOG_FILE" value="${r'${LOG_PATH}'}/${codeSystem.name?uncap_first}.log"/>
    <property name="FILE_LOG_PATTERN" value="%d{yyyy-MM-dd HH:mm:ss.SSS} %5p --- [%t] %-40.40logger{39} : %m%n%wEx"/>
    
    <logger name="y9.autoConfiguration" level="DEBUG" />
    <logger name="net.risesoft" level="DEBUG" />
    <logger name="org.mongodb" level="WARN" />
    <logger name="org.hibernate" level="WARN" />
    <logger name="org.hibernate.SQL" level="DEBUG"/>
    <logger name="org.apache.catalina.startup.Catalina" level="INFO" />

    <appender name="FileAppender" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <encoder>
            <pattern>${r'${FILE_LOG_PATTERN}'}</pattern>
            <charset>${r'${FILE_LOG_CHARSET}'}</charset>
        </encoder>
        <file>${r'${LOG_FILE}'}</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <fileNamePattern>${r'${LOGBACK_ROLLINGPOLICY_FILE_NAME_PATTERN:-${LOG_FILE}.%d{yyyy-MM-dd}.%i.gz}'}</fileNamePattern>
            <cleanHistoryOnStart>${r'${LOGBACK_ROLLINGPOLICY_CLEAN_HISTORY_ON_START:-false}'}</cleanHistoryOnStart>
            <maxFileSize>${r'${LOGBACK_ROLLINGPOLICY_MAX_FILE_SIZE:-100MB}'}</maxFileSize>
            <totalSizeCap>${r'${LOGBACK_ROLLINGPOLICY_TOTAL_SIZE_CAP:-10GB}'}</totalSizeCap>
            <maxHistory>${r'${LOGBACK_ROLLINGPOLICY_MAX_HISTORY:-7}'}</maxHistory>
        </rollingPolicy>
    </appender>

    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>${r'${CONSOLE_LOG_PATTERN}'}</pattern>
            <charset>${r'${CONSOLE_LOG_CHARSET}'}</charset>
        </encoder>
    </appender>

    <root level="INFO">
        <appender-ref ref="CONSOLE" />
        <appender-ref ref="FileAppender" />
    </root>
</configuration>