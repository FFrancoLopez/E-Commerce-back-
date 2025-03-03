import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Matches, MaxLength, MinLength, Validate } from 'class-validator';
import { MatchPassword } from 'src/utils/matchPassword';

export class CreateUserDto {


  /**
    * @description Nombre del usuario con al min. 3 caracteres y máximo 80.
    * @example Juan
  */
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  name: string;

  /**
    * @description La edad del usuario debe ser al menos de dos digitos.
    * @example 20
  */
  @IsNotEmpty()
  @IsNumber()
  age: number
  
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

  /**
    *@description Confirmación de la contraseña.
    *@example Ab123456!
  */
  @IsNotEmpty()
  @Validate( MatchPassword, ['password'])
  confirmPassword: string;

  /**
    *@description Dirección del usuario con al min. 3 caracteres y máximo 80.
    *@example Calle-123
  */
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  address: string;

  /**
    * @description Numero telefonico válido del usuario.
    * @example 1223456789
  */
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /**
    * @description País del usuario con min. 5 caracteres y máximo 20.
    * @example Argentina
  */
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  country: string;
  
  /**
    *@description Cuidad del usuario con min. 5 caracteres y máximo 20.
    *@example Córdoba
  */
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  city: string;
}