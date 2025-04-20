import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const port = configService.get<number>('PORT') || 3000

  app.enableCors({
    origin: [
      'http://192.168.100.2:3001',
      'http://192.168.100.2:3001', // Frontend web local
      'http://localhost:3000', // Frontend web
      'http://localhost:19000', // Expo Dev Server (nuevo)
      'exp://192.168.100.2:3001', // Expo en físico (Android/iOS) (nuevo)
      'http://192.168.100.2:8081', // Metro Bundler (nuevo)
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })

  await app.listen(port, '0.0.0.0')
}
bootstrap()
