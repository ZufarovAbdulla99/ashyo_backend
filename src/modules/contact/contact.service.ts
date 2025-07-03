import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TelegramService } from '../telegram/telegram.service';
import { Contact } from './models/contact.model';
import { CreateContactDto } from './dtos/create-comment.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    private readonly telegramService: TelegramService,
  ) {}

  async createContact(dto: CreateContactDto): Promise<Contact> {
    const contact = this.contactRepository.create({
      name: dto.name,
      email: dto.email,
      message: dto.message,
    });

    await this.contactRepository.save(contact);

    const message = `New Contact Us Message:
- Name: ${dto.name}
- Email: ${dto.email}
- Message: ${dto.message}`;
    await this.telegramService.sendMessage(message);

    return contact;
  }
}