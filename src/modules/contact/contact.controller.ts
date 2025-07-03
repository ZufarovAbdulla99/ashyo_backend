import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { Protected, Roles } from '@decorators';
import { UserRoles } from '../user/enums/user-roles.enum';
import { CreateContactDto } from './dtos/create-comment.dto';
import { Contact } from './models/contact.model';

@ApiTags('Contact Us')
@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    @Protected(false)
    @Roles([UserRoles.admin, UserRoles.user])
    @ApiOperation({ summary: 'Send a new contact message' })
    @Post()
    async createContact(@Body() dto: CreateContactDto): Promise<Contact> {
        return await this.contactService.createContact(dto);
    }
}
