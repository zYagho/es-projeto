import { Request, Response } from "express";
import { CreateUserService } from "../../services/users/CreateUserService";

class CreateUserController{
    async handle(req: Request, res: Response){

        const {name, email, password} = req.body;
        
        const createUser = new CreateUserService();
        const user = await createUser.execute({name, email, password})

        if(!user){
            throw new Error("Usuário já está cadastrado no banco.")
        }

        return res.json(user)
    }
}

export { CreateUserController }
