import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private readonly uploadDir = path.join(__dirname, '..', '..', 'uploads'); // Adjust path if necessary

  constructor() {
    // Ensure the upload directory exists
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async saveFile(file: Express.Multer.File): Promise<string> {
    try {
      // Generate a unique file name with the original extension
      const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
      const filePath = path.join(this.uploadDir, fileName);

      // Save file to disk
      fs.writeFileSync(filePath, file.buffer);

      // Return the file path relative to the server
      return `/uploads/${fileName}`;
    } catch (error) {
      throw new InternalServerErrorException('Failed to save file');
    }
  }
}
