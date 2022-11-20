import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { File } from './entities/file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  create(createFileDtos: CreateFileDto[]) {
    return this.fileRepository.save(createFileDtos);
  }

  findOne(id: string) {
    return this.fileRepository.findOneBy({ id });
  }

  remove(id: string) {
    return this.fileRepository.softDelete(id);
  }
}
