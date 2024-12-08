import { text } from "express";
import prismaCliente from "../prisma";
import { ValidateUser } from "../utils/ValidateUser";
import { hash } from "bcryptjs";

//Criando o tipo de informações que poderão ser passadas para criar o usuário.
interface UserRequest{
    name: string
    email: string
    password: string
}

class UserService{
    async create({name, email, password}: UserRequest){

        const userExist = new ValidateUser();
        const user = await userExist.userExists(email)

        if(user){
            throw new Error("Usuário já está cadastrado no banco.")
        }

        const passHash = await hash(password, 8);

        const newUser = await prismaCliente.user.create({
            data:{
                name:name,
                email:email,
                password:passHash
            },
            select:{
                id:true,
                name:true,
                email:true
            }
        })

        return newUser;
    }
    
    async detail(user_id: string){

        const user = await prismaCliente.user.findFirst({
            where:{
                id:user_id
            },
            select:{
                id:true,
                name:true,
                email:true
            }
        })
        return{user}
    }
}

export { UserService }