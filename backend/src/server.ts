import express, { Request, Response, NextFunction } from "express";
import 'express-async-errors'   //Sempre esse import tem que ser o segundo
import { router } from "./routes";
import cors from 'cors'
//O arquivo server será o primeiro a ser executado quando rodarmos o projeto backend.

const porta = 3333
//Configurando nosso servidor.
const app = express();

app.use(express.json()) //Usando arquivos JSON no nosso sistema.

app.use(cors()) //Habilitando para qualquer IP fazer uma requisição para a nossa API

app.use(router); //Usando nosso arquivo de rotas.  

app.use((err: Error, req: Request, res:Response, next: NextFunction)=>{     //Tratando caso venha um throw error.
    if(err instanceof Error){
        //Se for um erro:
        return(res.status(400).json({
            error: err.message
        }))
    }
    return res.status(500).json({
        status:'error',
        message:'internal server error.'
    })
})

app.listen(porta, ()=> console.log('Servidor Online na porta', `${porta}`))