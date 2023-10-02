import { Router } from "express";

import * as controllers from "./controllers";
import { updateDONKINews } from "./cronJobs";

const router = Router();

router.post("/SignUp", controllers.createUser); //user registration
router.post("/login", controllers.logInUser); // login
router.get("/user/:id", controllers.getUser); // id user
router.put("/user/:id", controllers.updateUser); // update user info
router.put("/user/:id/password", controllers.updatePassword); // update user password
router.put("/upload-image", controllers.); // user image to analize QUEEEEEEEEEE AAAAAAAAAAAAAAAAAAA
//router.put("/libery", controllers.);

// ruta /donki-news
router.get('/donki-news', (req, res) => {
  updateDONKINews(); 
  res.status(200).json({ message: 'Actualizando noticias de DONKI' });
});


export default router;
