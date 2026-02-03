<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <artifactId>risenet-y9boot-webapp-${codeSystem.name?uncap_first}</artifactId>
    <packaging>${codeSystem.war?string('war', 'jar')}</packaging>

    <parent>
        <groupId>net.risesoft</groupId>
        <artifactId>y9-digitalbase-parent</artifactId>
        <version>v9.6.9</version>
        <relativePath/>
    </parent>

    <properties>
        <java.version>11</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>net.risesoft</groupId>
            <artifactId>risenet-y9boot-starter-sso-oauth2-resource</artifactId>
            <version>${r'${project.version}'}</version>
        </dependency>

        <dependency>
            <groupId>net.risesoft</groupId>
            <artifactId>risenet-y9boot-starter-security</artifactId>
            <version>${r'${project.version}'}</version>
        </dependency>

        <dependency>
            <groupId>net.risesoft</groupId>
            <artifactId>risenet-y9boot-starter-jpa-public</artifactId>
            <version>${r'${project.version}'}</version>
        </dependency>
        <dependency>
            <groupId>net.risesoft</groupId>
            <artifactId>risenet-y9boot-starter-jpa-tenant</artifactId>
            <version>${r'${project.version}'}</version>
        </dependency>

        <dependency>
            <groupId>net.risesoft</groupId>
            <artifactId>risenet-y9boot-starter-log</artifactId>
            <version>${r'${project.version}'}</version>
        </dependency>

        <dependency>
            <groupId>net.risesoft</groupId>
            <artifactId>risenet-y9boot-properties</artifactId>
            <version>${r'${project.version}'}</version>
        </dependency>

        <dependency>
            <groupId>net.risesoft</groupId>
            <artifactId>risenet-y9boot-api-feignclient-platform</artifactId>
            <version>${r'${project.version}'}</version>
        </dependency>

        <dependency>
            <groupId>net.risesoft</groupId>
            <artifactId>risenet-y9boot-starter-idgenerator</artifactId>
            <version>${r'${project.version}'}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        <dependency>
            <groupId>net.risesoft</groupId>
            <artifactId>risenet-y9boot-starter-web</artifactId>
            <version>${r'${project.version}'}</version>
        </dependency>

        <dependency>
            <groupId>net.risesoft</groupId>
            <artifactId>risenet-y9boot-common-nacos</artifactId>
            <version>${r'${project.version}'}</version>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <scope>provided</scope>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
            <scope>provided</scope>
        </dependency>
    </dependencies>

    <build>
        <finalName>${codeSystem.name?uncap_first}</finalName>
    </build>
</project>