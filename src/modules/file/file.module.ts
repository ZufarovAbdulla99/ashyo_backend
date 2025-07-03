import { forwardRef, Module } from '@nestjs/common';
import { FileService } from './file.service';
// import { ProductModule } from '../product/product.module';

@Module({
    // imports: [forwardRef(() => ProductModule)],
    providers: [FileService],
    exports: [FileService],
})
export class FileModule { }