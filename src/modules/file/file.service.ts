import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { extname, join, resolve } from 'path';
import { v4 } from 'uuid';
import { promises as fsPromises, existsSync } from 'fs';

@Injectable()
export class FileService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
  try {
    const ext = extname(file.originalname);
    const file_name = file.originalname + '_' + v4() + ext.toLowerCase();
    const file_path = resolve(__dirname, '..', '..', '..', 'uploads');

    // Asinxron papkani yaratish (mavjud bo'lmasa)
    await fsPromises.mkdir(file_path, { recursive: true });

    // Faylni asinxron yozish
    await fsPromises.writeFile(join(file_path, file_name), file.buffer);

    return file_name;
  } catch (error) {
    throw new InternalServerErrorException(
      `Error on uploading file: ${error.message}`,
    );
  }
}

  async deleteFile(file_name: string) {
    const file_path = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'uploads',
      file_name,
    );

    try {
      if (!existsSync(file_path)) {
        console.warn(
          `Warning: File "${file_name}" not found. Skipping delete.`,
        );
        return;
      }

      await fsPromises.unlink(file_path);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error on deleting file: ${error.message}`,
      );
    }
  }
}
