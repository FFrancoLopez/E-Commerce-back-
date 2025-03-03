import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "../guards/auth.guard";
import { CreateUserDto } from "./dto/CreateUserDto.dto";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/roles.enum";
import { RolesGuard } from "src/guards/roles.guard";
import { ApiBearerAuth } from "@nestjs/swagger";


@Controller('users')

export class UsersController {
    
    constructor( private readonly usersService: UsersService) {}
    
    //Devuelve todos los usuarios sin sus contraseñas.
    @ApiBearerAuth()
    @HttpCode(200)
    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    async getUsers( @Query('page') page?: string, @Query('limit') limit?: string ) {
        try {
            const pageNumber = parseInt(page || '1');
            const limitNumber = parseInt(limit || '5');
            if (pageNumber && limitNumber) {
                return await this.usersService.getPaginatedUsers(pageNumber, limitNumber);
            }
            return await this.usersService.getAllUsers()

        } catch (error){
            throw new BadRequestException("Error al obtener los usuarios.")
        }
        
    }

    //Devuelve el usuario con el id pedido.
    @ApiBearerAuth()
    @HttpCode(200)
    @Get(':id')
    @UseGuards(AuthGuard)
    async getUserById( @Param('id', ParseUUIDPipe) id: string ) {
        const user = await this.usersService.getUserById(id);
        if (!user) throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
        return user;
    }

    //Crea un nuevo usuario y lo devuelve.
    @HttpCode(201)
    @Post() 
    async createUser(@Body() createUserDto: CreateUserDto) {
        try{
            return this.usersService.createUser(createUserDto);

        }catch (error){
            throw new BadRequestException("Error al crear el usuario.");
        }
    }

    //Actualiza los campos de un usuario especificado por ID.
    @ApiBearerAuth()
    @HttpCode(200)
    @Put(':id')
    @UseGuards(AuthGuard)
    async updateUser( @Param('id', ParseUUIDPipe) id: string, @Body() createUserDto: CreateUserDto ) {

        const updatedUser = await this.usersService.updateUser(id, createUserDto);

        if (!updatedUser) throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);

        return updatedUser;
    }

    //Elimina un usuario y devuelve su id.
    @ApiBearerAuth()
    @HttpCode(200)
    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteUser( @Param('id', ParseUUIDPipe) id: string ) {
        const deletedUser = await this.usersService.deleteUser(id);
        if (!deletedUser) throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
        return deletedUser;
    }
}
