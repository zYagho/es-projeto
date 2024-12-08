import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { AuthUserController } from "./controllers/AuthUserController";
import isAuthenticated from "./middlewares/isAuthenticated";

const router = Router();

router.post('/user', new UserController().create)

router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated, new UserController().detail)

export { router };