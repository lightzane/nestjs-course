# Adding swagger

```
npm install @nestjs/swagger swagger-ui-express
```

### src/main.ts

```typescript
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const options = new DocumentBuilder()
        .setTitle('My NestJs Course API')
        .setDescription('This is my description for my API :-)')
        .setVersion('1.0.0')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(process.env.PORT || 3000);
}

bootstrap();
```

# Errors

<strong>TypeError: httpAdapter.getType is not a function</strong><br>
Solution: Update your `@nestjs/platform-express` to the latest version
