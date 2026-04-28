# Backend Atelier Pricing

## Prérequis
- Java 17
- Maven
- MySQL lancé en local

## Configuration MySQL
Par défaut, le projet utilise :

```properties
spring.datasource.username=root
spring.datasource.password=
```

Si ton MySQL a un mot de passe, modifie :
`src/main/resources/application.properties`

## Lancer le backend

```bash
mvn spring-boot:run
```

API disponible sur :
`http://localhost:8080/api`
