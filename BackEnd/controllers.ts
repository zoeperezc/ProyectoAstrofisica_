import { Request, Response } from "express";
import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import multer from "multer"; 

const prisma = new PrismaClient();

const app = express(); // aplicación Express

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
const { name, mail, password } = req.body;

try {
const emailExists = await prisma.user.findUnique({
  where: {
    mail,
  },
});

if (emailExists) {
  return res.status(400).json("Mail already exists in the database");
}

const hashed_password = await bcrypt.hash(password, 10);

const user = await prisma.user.create({
  data: {
    name,
    mail,
    password: hashed_password,
  },
});

return res.status(201).json(user);
} catch (err) {
return res.status(400).json("Error");
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
return res.status(400).json("Error");
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
return res.status(400).json("Error");
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
return res.status(400).json("Error");
}
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // carpeta de destino 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Generar unique
    cb(null, uniqueSuffix + '-' + file.originalname); // Renombrar el archivo 
  },

});

const upload = multer({ storage });

app.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json("No se ha subido ninguna imagen.");
    }

    // Aquí puedes guardar el nombre de la imagen (req.file.filename) en la base de datos
    // Puedes usar Prisma o la herramienta que estés utilizando para interactuar con la base de datos

    return res.status(201).json("Imagen subida correctamente.");
  } catch (err) {
    console.error(err);
    return res.status(500).json("Error al subir la imagen.");
  }
});

export async function getDONKINews(req: Request, res: Response) {
  try {
    const apiKey = 'TU_API_KEY'; // Reemplaza con tu propia API key de NASA DONKI
    const startDate = 'yyyy-MM-dd'; // Especifica la fecha de inicio
    const endDate = 'yyyy-MM-dd'; // Especifica la fecha de fin

    const response = await axios.get(`https://api.nasa.gov/DONKI/notifications?startDate=${startDate}&endDate=${endDate}&type=all&api_key=${apiKey}`);

    // Maneja la respuesta de DONKI aquí, por ejemplo, puedes enviarla como respuesta a tu cliente
    res.status(200).json(response.data);
  } catch (error) {
    // Maneja los errores aquí
    console.error(error);
    res.status(500).json({ error: 'Error al obtener noticias de DONKI' });
  }
}

export { prisma, app }; 