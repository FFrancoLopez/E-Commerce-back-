import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class LoginUserDto {

  /**
    * @description Debe ser un email válido.
    * @example juan@gmail.com
  */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
    * @description La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número, un carácter especial y entre 8 y 15 caracteres.
    * @example Ab123456!
  */
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message: 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
  })
  password: string;
}