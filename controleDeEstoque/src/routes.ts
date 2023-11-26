import { Router, Request, Response} from "express";
import { CreateUserController } from "./controllers/user/createUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { DetailUserController } from "./controllers/models/interfaces/User/DetailUserController";

const router = Router()
router.get("/test", (request: Request, response: Response) => {
    return response.json({ok: true});
})
 //User Routes

 router.post("/user", new CreateUserController().handle)
 router.post("/session",new AuthUserController().handle)
 router.get("/me", isAuthenticated, new DetailUserController().handle)

export {router}