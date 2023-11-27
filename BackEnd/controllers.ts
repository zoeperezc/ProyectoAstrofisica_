import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
//import fetch from "node-fetch";
//import FastAPI from "fastapi";

const prisma = new PrismaClient();

const app = express(); 

export async function getUser(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        mail: true,
      },
    });

    if (!user) {
      return res.status(404).json("User not found");
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ error: "User not found" });
  }
}

export async function createUser(req: Request, res: Response) {
  const { username, mail, password_1,id } = req.body;
 
  try {
    const emailExists = await prisma.user.findUnique({
      where: {
        mail,
      },
    });

    if (emailExists) {
      return res.status(400).json("Mail already exists in the database");
    }
     
    const uniqueID = uuidv4();
    const hashed_password = bcrypt.hashSync(password_1, 10);

    const user = await prisma.user.create({
      data: {
        id: uniqueID,
        username: '',
        mail: mail,
        password: hashed_password,
      },
    });


    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).json("Error createUser no del mail");
  }
}

export async function logInUser(req: Request, res: Response) {
  const { mail, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        mail,
      },
    });

    if (!user) {
      return res
        .status(401)
        .json("Ese Mail no está registrado en nuestra base de datos");
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return res.status(401).json("Contraseña incorrecta");
    }

    return res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    return res.status(400).json("Error conexion LogIn");
  }
}
export async function updateUser(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json("User not found");
    }

    const { username, mail } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        username,
        mail,
      },
      select: {
        id: true,
        username: true,
        mail: true,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(400).json("Error updateUser");
  }
}

export async function updatePassword(req: Request, res: Response) {
  const { mail, password, new_password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { mail },
    });

    if (!user) {
      return res.status(400).json("El Mail no existe en la base de datos");
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return res.status(400).json("Contraseña incorrecta");
    }

    const hashedNewPassword = await bcrypt.hash(new_password, 10);

    await prisma.user.update({
      where: { mail },
      data: {
        password: hashedNewPassword,
      },
    });

    return res.status(200).json("Contraseña actualizada correctamente");
  } catch (err) {
    return res.status(400).json("Error actualizacion de contreseña");
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

export async function uploadImage(req: Request, res: Response ) {
  const upload = multer({ storage });

  upload.single('image')(req, res, async (err: any) => {
    try {
      if (err) {
        return res.status(400).json('Error uploading image: ' + err.message);
      }
      if (!req.file) {
        return res.status(400).json('No image uploaded.');
      }

      const filename = req.file.filename;
      const userId = parseInt(req.params.id);

      const savedImage = await prisma.image.create({
        data: {
          filename: filename,
          image_type: 'jpeg/png/jpng/bmp',  
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
      
      return res.status(201).json({ message: 'Image uploaded successfully', image: savedImage });
    } catch (err) {
      console.error(err);
      return res.status(500).json('Error uploading image');
    }
  });
}


export async function getLibery(req: Request, res: Response) {
  const userId = parseInt(req.params.id!);

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        Image: true,
      },
    });

    if (!user) {
      return res.status(404).json("El usuario no existe");
    }

    return res.status(200).json(user.Image);
  } catch (err: any) {
    return res.status(400).json(err.message);
  }
}


export const getApodData = (req: Request, res: Response) => {
  const apiKey = "UJiVXjcI3Wg7Qdy2WGzUQVQUF37bJPvq7bIt6qJE";
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
};

export { prisma, app };
