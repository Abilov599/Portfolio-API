import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from "typeorm";
import { UsersModule } from "./users/users.module";
import { User } from "./users/user.entity";

@Module({
  imports: [ConfigModule.forRoot(),TypeOrmModule.forRoot({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: true,
    extra:
     {ssl: { rejectUnauthorized: false }}
   ,
    entities: [User],
  }), UsersModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
