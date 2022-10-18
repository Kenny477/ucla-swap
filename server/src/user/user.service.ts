import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async updateVerificationToken(userId: string, token: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (user) {
      const currentTime = new Date();
      return this.userRepository
        .createQueryBuilder()
        .update({
          emailVerified:
            user?.verificationToken === token &&
            (user?.verificationTokenExpires ?? currentTime) > currentTime,
        })
        .where({ id: userId })
        .execute();
    }
    return null;
  }

  async addVerificationToken(
    userId: string,
    fields: { verificationToken: string; verificationTokenExpires: Date },
  ): Promise<any> {
    return this.userRepository
      .createQueryBuilder()
      .update(fields)
      .where({ id: userId })
      .execute();
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  create(user: DeepPartial<User>): Promise<User> {
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.softDelete(id);
  }
}
