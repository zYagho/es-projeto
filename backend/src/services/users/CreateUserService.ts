import prismaCliente from "../../prisma";
import { ValidadeUserService } from "./ValidadeUserService";
import { hash } from "bcryptjs";

//Criando o tipo de informações que poderão ser passadas para criar o usuário.
interface UserRequest{
    name: string
    email: string
    password: string
}

class CreateUserService{
    async create({name, email, password}: UserRequest){

        //validando se esse usuário já existe no banco.
        const userExist = new ValidadeUserService();
        const user = await userExist.userExists(email)

        //Se o usuário não existir, crie ele.
        if(!user){

            //Criptografando a senha.
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
        //"Usuário já existe"
        return;
    }

}

export { CreateUserService }