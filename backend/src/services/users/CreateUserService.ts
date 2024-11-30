import prismaCliente from "../../prisma";
import { ValidadeUserService } from "./ValidadeUserService";

//Criando o tipo de informações que poderão ser passadas para criar o usuário.
interface UserRequest{
    name: string
    email: string
    password: string
}

class CreateUserService{
    async execute({name, email, password}: UserRequest){

        //validando se esse usuário já existe no banco.
        const userExist = new ValidadeUserService();
        const user = await userExist.userExists(email)

        //Se o usuário não existir, crie ele.
        if(!user){
            const newUser = await prismaCliente.user.create({
                data:{
                    name:name,
                    email:email,
                    password:password
                }
            })

            return newUser;
        }
        //"Usuário já existe"
        return;
    }
}

export {CreateUserService}