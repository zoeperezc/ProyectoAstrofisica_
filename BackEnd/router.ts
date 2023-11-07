import { Router } from "express";

import * as controllers from "./controllers";
import { updateDONKINews } from "./cronJobs";

const router = Router();

router.post("/register", controllers.createUser); //user registration
router.post("/login", controllers.logInUser); // login
router.get("/indice", (req, res) => {
  // Enviar el contenido HTML de "indice.html" como respuesta
  const fs = require("fs");
  const path = require("path");
  const indexPath = path.join(__dirname, "indice.html"); 
  fs.readFile(indexPath, "utf8", (err: Error | null, data: string) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al cargar la página 'indice.html'");
    } else {
      res.status(200).send(data);
    }
  });
});
router.get("/user/:id", controllers.getUser); // id user
router.put("/user/:id", controllers.updateUser); // update user info
router.put("/user/:id/password", controllers.updatePassword); // update user password
router.post("/upload-image", controllers.uploadImage); // user image to analize
router.get("/user/:id/libery", controllers.getLibery);

// ruta /donki-news
router.get('/donki-news', (req, res) => {
  updateDONKINews(); 
  res.status(200).json({ message: 'Actualizando noticias de DONKI' });
});


export default router;
