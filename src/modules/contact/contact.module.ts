import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TelegramModule } from '../telegram/telegram.module';
import { Contact } from './models/contact.model';

@Module({
  imports: [TypeOrmModule.forFeature([Contact]), TelegramModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}

