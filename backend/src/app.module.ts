import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DietModule } from './diet/diet.module';

@Module({
  imports: [AuthModule, UserModule, DietModule],
})
export class AppModule {}
