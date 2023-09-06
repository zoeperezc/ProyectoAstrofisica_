import { Router } from "express";

import * as controllers from "./controllers";

const router = Router();

router.post("/signup", controllers.createUser); //user registration
router.post("/login", controllers.logInUser); // login
router.get("/user/:id", controllers.getUser); // ID user
router.put("/user/:id", controllers.updateUser); // Update user info
router.put("/user/:id/password", controllers.updatePassword); // Update user password

export default router;
