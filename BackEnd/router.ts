import { Router } from "express";

import * as controllers from "./controllers";

const router = Router();

router.post("/SignUp", controllers.createUser); //user registration
router.post("/login", controllers.logInUser); // login
router.get("/user/:id", controllers.getUser); // id user
router.put("/user/:id", controllers.updateUser); // update user info
router.put("/user/:id/password", controllers.updatePassword); // update user password
//router.put("/user/:id/image", controllers.); // user image to analize QUEEEEEEEEEE AAAAAAAAAAAAAAAAAAA

export default router;
