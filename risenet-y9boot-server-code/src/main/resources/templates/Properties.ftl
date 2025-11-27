<#if codeSystem.environment == 0>
management:
    endpoints:
        web:
            exposure:
                include: '*'
server:
    port: 8080
    servlet:
        encoding:
            charset: UTF-8
            enabled: true
            force: true
        session:
              tracking-modes: COOKIE
        register-default-servlet: true
        context-path: /${codeSystem.name?uncap_first}
spring:
    application:
        name: ${codeSystem.name?uncap_first}
    cloud:
        nacos:
            config:
                enabled: false
                group: DEFAULT_GROUP
                namespace: '6c9ebcb4-5ae0-46d0-bc2a-59ecc28b9abf'
                server-addr: https://dev.youshengyun.com:443
                username: nacos
                password: nacos@2022
            discovery:
                enabled: false
    config:
        import:
            - optional:nacos:${codeSystem.name?uncap_first}.yml
    aop:
        auto: false
        proxy-target-class: true
    autoconfigure:
        exclude:
            - org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
    datasource:
        type: com.alibaba.druid.pool.DruidDataSource
        druid:
            y9-public:
                driver-class-name: com.mysql.cj.jdbc.Driver
                url: jdbc:mysql://dev.youshengyun.com:3306/y9_public?serverTimezone=GMT%2B8&nullCatalogMeansCurrent=true&useUnicode=true&characterEncoding=utf-8&rewriteBatchedStatements=true&useCompression=true&useSSL=false
                username: root
                password: 'Y9i-83204585'
                initialSize: 1
                maxActive: 20
                maxPoolPreparedStatementPerConnectionSize: 100
                maxWait: 60000
                minEvictableIdleTimeMillis: 300000
                minIdle: 1
                poolPreparedStatements: true
                testOnBorrow: false
                testOnReturn: false
                testWhileIdle: true
                timeBetweenEvictionRunsMillis: 60000
                useGlobalDataSourceStat: true
                validationQuery: SELECT 1 FROM DUAL
    jpa:
        hibernate:
            naming:
                implicit-strategy: org.hibernate.boot.model.naming.ImplicitNamingStrategyLegacyHbmImpl
                physical-strategy: org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
        open-in-view: false
        properties:
            hibernate:
                cache:
                    use_query_cache: false
                    use_second_level_cache: false
                dialect: org.hibernate.dialect.MySQL8Dialect
                hbm2ddl:
                    auto: update
                jdbc:
                    batch_size: 100
                show_sql: false
    kafka:
        bootstrap-servers: dev.youshengyun.com:9092
        consumer:
            auto-commit-interval: 1000
            enable-auto-commit: true
            group-id: y9${codeSystem.name?cap_first}-server
    main:
        allow-bean-definition-overriding: true
    redis:
        database: 9
        host: dev.youshengyun.com
        lettuce:
            pool:
                max-active: 8
                max-idle: 8
                max-wait: -1
                min-idle: 0
            shutdown-timeout: 100ms
        password: y9i-83204585
        port: 6379
        ssl: false
        timeout: 10000
y9:
    systemName: ${codeSystem.name?uncap_first}
    internalIp: 192.168.x.x,10.0.x.x,172.20.x.x
    app:
        log:
            kafkaEnabled: false
    common:
        cacheEnabled: true
        homeBaseUrl: https://dev.youshengyun.com/y9home
        logBaseUrl: https://dev.youshengyun.com/log
        orgBaseUrl: https://dev.youshengyun.com/platform
        y9DigitalBaseUrl: https://dev.youshengyun.com/y9DigitalBase
        userOnlineBaseUrl: https://dev.youshengyun.com/userOnline
    feature:
        jpa:
            packagesToScanEntityPublic: net.risesoft.y9public.entity
            packagesToScanEntityTenant: net.risesoft.entity
            packagesToScanRepositoryPublic: net.risesoft.y9public.repository
            packagesToScanRepositoryTenant: net.risesoft.repository
        listener:
            redis:
                enabled: false
        log:
            enabled: true
        publish:
            kafka:
                enabled: true
        session:
            redis:
                enabled: true
                maxInactiveIntervalInSeconds: 3600
        security:
            enabled: true
            cors:
                allowCredentials: true
                allowedOriginPatterns:
                    #- 允许跨域访问的客户端地址,请根据实际前端地址更改
                    - https://*.youshengyun.com
                    - http://*.youshengyun.com
                    - http://localhost:7056
                    - http://localhost:8080
                    - http://localhost:8081
            xss:
                ignoreParam:
                    - id
                    - meta
        oauth2:
            resource:
                #- 是否保存用户操作日志
                saveLogMessage: false
                #- 是否保存用户在线信息
                saveOnlineMessage: true
                allowBasicAuthentication: true
                allowFormEncodedBodyParameter: true
                allowUriQueryParameter: true
                #- 单点登录保护的路径,多个路径以英文逗号分隔,如${r'/vue/*,/admin/*'}
                protectedUrlPatterns: ${r'/vue/*'}
                opaque:
                    #- 客户端唯一标示,由认证服务提供商分配
                    client-id: clientid
                    #- 客户端密钥,由认证服务提供商分配
                    client-secret: secret
                    #- 认证服务器验证访问令牌有效性的路径
                    introspection-uri: https://dev.youshengyun.com/sso/oauth2.0/introspect
                    #- 认证服务器获取用户信息路径
                    profile-uri: https://dev.youshengyun.com/sso/oauth2.0/profile
<#else>
management:
    endpoints:
        web:
            exposure:
                include: '*'
server:
    port: 8080
    servlet:
        encoding:
            charset: UTF-8
            enabled: true
            force: true
        session:
              tracking-modes: COOKIE
        register-default-servlet: true
        context-path: /${codeSystem.name?uncap_first}
spring:
    application:
        name: ${codeSystem.name?uncap_first}
    cloud:
        nacos:
            config:
                enabled: false
                group: DEFAULT_GROUP
                namespace: '6c9ebcb4-5ae0-46d0-bc2a-59ecc28b9abf'
                server-addr: http://localhost:443
                username: nacos
                password: nacos@2022
            discovery:
                enabled: false
    config:
        import:
            - optional:nacos:${codeSystem.name?uncap_first}.yml
    aop:
        auto: false
        proxy-target-class: true
    autoconfigure:
        exclude:
            - org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
    datasource:
        type: com.alibaba.druid.pool.DruidDataSource
        druid:
            y9-public:
                driver-class-name: com.mysql.cj.jdbc.Driver
                url: jdbc:mysql://localhost:3306/y9_public?serverTimezone=GMT%2B8&nullCatalogMeansCurrent=true&useUnicode=true&characterEncoding=utf-8&rewriteBatchedStatements=true&useCompression=true&useSSL=false
                username: root
                password: 'Y9i-83204585'
                initialSize: 1
                maxActive: 20
                maxPoolPreparedStatementPerConnectionSize: 100
                maxWait: 60000
                minEvictableIdleTimeMillis: 300000
                minIdle: 1
                poolPreparedStatements: true
                testOnBorrow: false
                testOnReturn: false
                testWhileIdle: true
                timeBetweenEvictionRunsMillis: 60000
                useGlobalDataSourceStat: true
                validationQuery: SELECT 1 FROM DUAL
    jpa:
        hibernate:
            naming:
                implicit-strategy: org.hibernate.boot.model.naming.ImplicitNamingStrategyLegacyHbmImpl
                physical-strategy: org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
        open-in-view: false
        properties:
            hibernate:
                cache:
                    use_query_cache: false
                    use_second_level_cache: false
                dialect: org.hibernate.dialect.MySQL8Dialect
                hbm2ddl:
                    auto: update
                jdbc:
                    batch_size: 100
                show_sql: false
    kafka:
        bootstrap-servers: localhost:9092
        consumer:
            auto-commit-interval: 1000
            enable-auto-commit: true
            group-id: y9${codeSystem.name?cap_first}-server
    main:
        allow-bean-definition-overriding: true
    redis:
        database: 9
        host: localhost
        lettuce:
            pool:
                max-active: 8
                max-idle: 8
                max-wait: -1
                min-idle: 0
            shutdown-timeout: 100ms
        password: y9i-83204585
        port: 6379
        ssl: false
        timeout: 10000
y9:
    systemName: ${codeSystem.name?uncap_first}
    internalIp: 192.168.x.x,10.0.x.x,172.20.x.x
    app:
        log:
            kafkaEnabled: false
    common:
        cacheEnabled: true
        homeBaseUrl: http://localhost:8080/y9home
        logBaseUrl: http://localhost:8080/log
        orgBaseUrl: http://localhost:8080/platform
        y9DigitalBaseUrl: http://localhost:8080/y9DigitalBase
        userOnlineBaseUrl: http://localhost:8080/userOnline
    feature:
        jpa:
            packagesToScanEntityPublic: net.risesoft.y9public.entity
            packagesToScanEntityTenant: net.risesoft.entity
            packagesToScanRepositoryPublic: net.risesoft.y9public.repository
            packagesToScanRepositoryTenant: net.risesoft.repository
        listener:
            redis:
                enabled: false
        log:
            enabled: true
        publish:
            kafka:
                enabled: true
        session:
            redis:
                enabled: true
                maxInactiveIntervalInSeconds: 3600
        security:
            enabled: true
            cors:
                allowCredentials: true
                allowedOriginPatterns:
                    #- 允许跨域访问的客户端地址,请根据实际前端地址更改
                    - https://*.youshengyun.com
                    - http://*.youshengyun.com
                    - http://localhost:7056
                    - http://localhost:8080
                    - http://localhost:8081
            xss:
                ignoreParam:
                    - id
                    - meta
        oauth2:
            resource:
                #- 是否保存用户操作日志
                saveLogMessage: false
                #- 是否保存用户在线信息
                saveOnlineMessage: true
                allowBasicAuthentication: true
                allowFormEncodedBodyParameter: true
                allowUriQueryParameter: true
                #- 单点登录保护的路径,多个路径以英文逗号分隔,如${r'/vue/*,/admin/*'}
                protectedUrlPatterns: ${r'/vue/*'}
                opaque:
                    #- 客户端唯一标示,由认证服务提供商分配
                    client-id: clientid
                    #- 客户端密钥,由认证服务提供商分配
                    client-secret: secret
                    #- 认证服务器验证访问令牌有效性的路径
                    introspection-uri: http://localhost:7055/sso/oauth2.0/introspect
                    #- 认证服务器获取用户信息路径
                    profile-uri: http://localhost:7055/sso/oauth2.0/profile
</#if>