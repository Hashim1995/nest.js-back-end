import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Create a new Nest.js application instance using the AppModule and assign it to the 'app' variable.
  const app = await NestFactory.create(AppModule);
  // Attach a new instance of the ValidationPipe class to the global application pipeline, which is responsible for processing incoming requests and outgoing responses.
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));
  // Start the application listening on port 3001.
  await app.listen(3001);
}

// Call the 'bootstrap' function, starting the Nest.js application.
bootstrap();
