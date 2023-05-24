import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SignInDto } from './dto/sign-in.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
  ) {}
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(signInDto: SignInDto): Promise<string> {
    const { username, password } = signInDto;
    const user = await this.usersRepository.findOne({ username });
    if (user && (await compare(password, user.password))) {
      return 'success';
    } else {
      throw new UnauthorizedException({
        message: 'Wrong password or username',
      });
    }
  }
}
