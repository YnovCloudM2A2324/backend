import { Controller, Get, Res, Post, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { readdir } from 'fs/promises';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  
  private readonly uploadPath = './storage';

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './storage',
      filename: (req, file, callback) => {
        const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + new Date().toISOString();
        const extension: string = path.parse(file.originalname).ext;

        callback(null, `${filename}${extension}`)
      },
    }),
  }))
  async uploadFile(@UploadedFile() file) {
    if (!file) {
      throw new HttpException('Le fichier est manquant', HttpStatus.BAD_REQUEST);
    }
    console.log(file);
    return {
      message: 'Le fichier a été téléchargé avec succès',
      data: file,
    };
  }

  @Get()
  async listAllFiles(@Res() res: Response) {
    try {
      const files = await readdir(this.uploadPath); // Lire le contenu du répertoire de chargement
      res.json(files);
    } catch (err) {
      throw new HttpException('Impossible de lire les fichiers', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}