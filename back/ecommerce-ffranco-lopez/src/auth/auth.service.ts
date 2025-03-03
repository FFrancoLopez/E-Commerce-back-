import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { User } from "../users/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()

export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async signup(user: Partial<User>) {
        // Verificamos que el email no esté registrado.
        const existingUser = await this.usersService.findUserByEmail(user.email);
        if (existingUser){ 
            throw new BadRequestException("El email ya está registrado.")
        };

        // Hasheamos la contraseña y creamos el nuevo usuario.
        const hashPassword = await bcrypt.hash(user.password, 10);
        const newUser = {...user, password: hashPassword};

        const saveUser = await this.usersRepository.save(newUser);
        const {password, ...userWithoutPassword} = saveUser;

        // Generamos el token de autenticación.
        const payload = {
            id: saveUser.id,
            email: saveUser.email,
            isAdmin: saveUser.isAdmin
        };
        const token = this.jwtService.sign(payload)

        //Retornamos el usuario sin contraseña y el token.
        return {user: userWithoutPassword, token};
    }

    async signIn(email: string, password: string ) {
        const user = await this.usersRepository.createQueryBuilder('user').where('LOWER(user.email) = :email', {email: email.toLowerCase()}).getOne();

        if(!user || !(await bcrypt.compare(password, user.password))){
            throw new NotFoundException("Email o contraseña incorrecta.")
        }
        
        const payload = {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
        }
        const token = this.jwtService.sign(payload)

        return {
            token, 
            message: "Usuario loggeado con éxito."
        }
    }
}