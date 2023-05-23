import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { hash, genSalt } from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    const user = this.create({ username, password: hashedPassword });
    try {
      await this.save(user);
    } catch (err) {
      if (err.code == 23505) {
        throw new ConflictException(['Username already taken']);
      } else {
        throw new InternalServerErrorException();
      }
    }
    await this.save(user);
  }
}
