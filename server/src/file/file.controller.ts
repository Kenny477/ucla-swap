import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UploadedFiles,
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './storage',
        filename: (req, file, cb) => {
          cb(null, `${uuidv4()}_${file.originalname}`);
        },
      }),
    }),
  )
  create(
    @UploadedFiles(
      // new ParseFilePipe({
      //   validators: [
      //     new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }), // 10MB
      //     new FileTypeValidator({ fileType: /\.(jpg|jpeg|png)$/ }),
      //   ],
      // }),
    )
    files: Array<Express.Multer.File>,
  ) {
    const fileInfos: CreateFileDto[] = files.map((file) => {
      return {
        filename: file.filename,
        size: file.size,
        mimetype: file.mimetype,
      };
    });
    return this.fileService.create(fileInfos);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(id);
  }
}
