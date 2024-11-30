import prismaCliente from "../../prisma";

//Serviço criado para validar todas as informações necessárias de um usuário.

class ValidadeUserService{
    async userExists(email:string){
        const userExist = await prismaCliente.user.findFirst({
            where:{
                email:email
            }
        })
        return userExist ? true : false;
    }
}

export { ValidadeUserService };