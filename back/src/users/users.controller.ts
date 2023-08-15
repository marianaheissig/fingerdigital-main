import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { query } from 'express';

interface userlogin{
    email: string,
    password: string
}

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ){}

    @Get()
    async findAll(){
        return this.usersService.findAll();
    }    

    //post pq ele manda e recebe infos
    @Post('login')
    async findOne(@Body() data: userlogin){
        console.log("user controller");
        return this.usersService.findOne(data.email, data.password);
    }
    
    @Post()
    async create(@Body() userData: any){
        return this.usersService.create(userData);
    }

    @Put(':id')
    async update(@Param('id')id: number, @Body()userData: any) {
        return this.usersService.update(id, userData);
    }

    @Delete(':id')
    async delete(@Param(':id')id: number){
        return this.usersService.delete(id);
    }
}
