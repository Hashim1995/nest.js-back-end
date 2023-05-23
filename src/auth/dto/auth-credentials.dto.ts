import { MinLength, IsString, MaxLength, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @IsString({ message: 'username must be a string' })
  @MinLength(8, { message: 'username must be minimum 8 charachters' })
  @MaxLength(20, { message: 'username must be maxmimum 20 charachters' })
  username: string;

  @IsString({ message: 'password must be a string' })
  @MinLength(7, { message: 'password minimum 7 charachters' })
  @MaxLength(32, { message: 'password maxmimum 32 charachters' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password must be includes at least one UPPERCASE, one LOWERCASE, one NUMBER or SPECIAL CHARACHTER ',
  })
  password: string;
}
