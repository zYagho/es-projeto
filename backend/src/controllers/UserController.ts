import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController{
    async create(req: Request, res: Response){

        const {name, email, password} = req.body;
        
        const createUser = new UserService();
        const user = await createUser.create({name, email, password})

        return res.json(user)
    }

    async detail(req: Request, res: Response){

        const user_id = req.user_id;

        const detailUserService = new UserService();
        const user = await detailUserService.detail(user_id);
    
        return res.json(user)
    }

}

export { UserController }
