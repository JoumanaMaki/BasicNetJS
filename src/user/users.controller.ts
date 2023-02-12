import { Controller , Get, Post, Res, Body} from "@nestjs/common";
import { Delete, HttpCode, Param, Patch } from "@nestjs/common/decorators";
import {Request} from "express"
import { CreateUserDto } from "./dtos/createUser.dto";
import { UpdateUserDto } from "./dtos/UpdateUser.dto";
import { UserEntity } from "./user.entity";
import{v4 as uuid }from 'uuid'
@Controller('users')
export class UsersController{

   private  users: UserEntity[]=[];
    @Get()
    find() {
    return this.users;
    }

    @Get(":id")
    findOne(@Param("id") id : string) {
        return this.users.find((user)=>user.id===id);
    }

    @Post()
   // create(@Req() req: Request) : string {
    create(@Body() userData: CreateUserDto)  {
       // console.log(req.body)
       const newUser= {
        ...userData,
        id:uuid(),
       }
       this.users.push(newUser);
    return newUser;
    }

    @Patch(":id")
    update(@Param("id") id : string, @Body() updateUserdto:UpdateUserDto) {
       
        const index = this.users.findIndex((user)=>user.id===id)
        this.users[index]  = { ...this.users[index], ...updateUserdto}
        return this.users[index];
    }

    @Delete(":id")
    @HttpCode(204)
    delete(@Param("id") id : string , @Res() res) {
     //   return username;
     this.users =this.users.filter((user)=>user.id !== id)
     return  "DELETED";
    }
}