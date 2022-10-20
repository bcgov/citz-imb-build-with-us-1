import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { HealthModule } from './health/health.module';

@Module({
  imports: [ConfigModule.forRoot(), HealthModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
