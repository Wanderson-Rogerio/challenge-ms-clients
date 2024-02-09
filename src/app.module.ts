import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientModule } from './modules/clients/client.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { env } from './env';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientModule,
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule {}
