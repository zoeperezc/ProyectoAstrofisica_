import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import multer from "multer"; 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination folder where the uploaded file will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Renaming the file to make it unique
  },
});

const upload = multer({ storage });

const prisma = new PrismaClient();

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



export { prisma }; 