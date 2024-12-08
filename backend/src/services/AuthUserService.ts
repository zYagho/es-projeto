import { ValidateUser } from "../utils/ValidateUser";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken'

interface AuthRequest{
    email:string,
    password:string
}

class AuthUserService{
    async auth({email, password}:AuthRequest){

        const userExist = new ValidateUser();
        const user = await userExist.userExists(email)

        if(!user){
            throw new Error("Usuário/Senha incorreta.")
        }

        const passwordMatch = await compare(password, user.password)
     
        if(!passwordMatch){
            throw new Error("Usuário/Senha incorreta.")
        }

        const token = sign({
                name:user.name,
                email:user.email
            },
            process.env.JWT_SECRET,
            {
                subject:user.id,
                expiresIn:'30d'
            }
        )

        return{
            id:user.id,
            name:user.name,
            email:user.email,
            token:token
        }
        
    }
}

export { AuthUserService };