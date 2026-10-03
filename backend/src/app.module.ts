import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeansModule } from './beans/beans.module';
import { ConfigModule } from '@nestjs/config';
import { BrewsModule } from './brews/brews.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    BeansModule,
    BrewsModule,
    DashboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
