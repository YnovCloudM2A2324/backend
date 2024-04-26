import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [
    MulterModule.register({
      dest: '../src/storage',
    }),
  ],
})
export class FilesModule {}
