import { forwardRef, Module } from '@nestjs/common';
import { FileService } from './file.service';
import { ProductModule } from '../product';

@Module({
    // imports: [forwardRef(() => ProductModule)],
    providers: [FileService],
    exports: [FileService],
})
export class FileModule { }