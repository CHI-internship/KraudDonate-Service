import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json } from 'body-parser';
import { serverAdapter } from './services/bull';
import { AllExceptionsFilter } from './utils/error/error.handling';

const port = process.env.DEV_PORT!;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const adapterHost = app.get(HttpAdapterHost);

  app.enableCors({
    exposedHeaders: 'Authorization',
  });
  const config = new DocumentBuilder()
    .setTitle('Kraud Donate main service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use('/bull/queues', serverAdapter.getRouter());
  app.use(json({ limit: '50mb' }));

  app.useGlobalFilters(new AllExceptionsFilter(adapterHost));

  await app.listen(port);
  console.log(`Server is listening on port: ${port}`);
}

bootstrap();
