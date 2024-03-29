import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ViewsModule } from './views/views.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, ViewsModule],
  providers: [],
  controllers: [],
})
export class AppModule {}
