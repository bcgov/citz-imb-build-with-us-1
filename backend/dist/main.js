"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Onboarding')
        .setDescription(`Build With Us - Season 1 (NestJS API Docs)\n
      NestJS Official Documentation: https://docs.nestjs.com`)
        .setVersion('1.0')
        .addTag('Health')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.API_PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map