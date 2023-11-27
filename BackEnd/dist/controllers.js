"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.prisma = exports.getApodData = exports.getLibery = exports.uploadImage = exports.updatePassword = exports.updateUser = exports.logInUser = exports.createUser = exports.getUser = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
//import fetch from "node-fetch";
//import FastAPI from "fastapi";
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
const app = (0, express_1.default)();
exports.app = app;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        try {
            const user = yield prisma.user.findUnique({
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
        }
        catch (err) {
            return res.status(400).json({ error: "User not found" });
        }
    });
}
exports.getUser = getUser;
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, mail, password_1, id } = req.body;
        try {
            const emailExists = yield prisma.user.findUnique({
                where: {
                    mail,
                },
            });
            if (emailExists) {
                return res.status(400).json("Mail already exists in the database");
            }
            const uniqueID = (0, uuid_1.v4)();
            const hashed_password = bcrypt_1.default.hashSync(password_1, 10);
            const user = yield prisma.user.create({
                data: {
                    id: uniqueID,
                    username: '',
                    mail: mail,
                    password: hashed_password,
                },
            });
            return res.status(201).json(user);
        }
        catch (err) {
            console.log(err);
            return res.status(400).json("Error createUser no del mail");
        }
    });
}
exports.createUser = createUser;
function logInUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { mail, password } = req.body;
        try {
            const user = yield prisma.user.findUnique({
                where: {
                    mail,
                },
            });
            if (!user) {
                return res
                    .status(401)
                    .json("Ese Mail no está registrado en nuestra base de datos");
            }
            const passwordsMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordsMatch) {
                return res.status(401).json("Contraseña incorrecta");
            }
            return res.status(200).json({ message: "Login successful", user });
        }
        catch (err) {
            return res.status(400).json("Error conexion LogIn");
        }
    });
}
exports.logInUser = logInUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        try {
            const user = yield prisma.user.findUnique({
                where: { id },
            });
            if (!user) {
                return res.status(404).json("User not found");
            }
            const { username, mail } = req.body;
            const updatedUser = yield prisma.user.update({
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
        }
        catch (err) {
            return res.status(400).json("Error updateUser");
        }
    });
}
exports.updateUser = updateUser;
function updatePassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { mail, password, new_password } = req.body;
        try {
            const user = yield prisma.user.findUnique({
                where: { mail },
            });
            if (!user) {
                return res.status(400).json("El Mail no existe en la base de datos");
            }
            const passwordsMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordsMatch) {
                return res.status(400).json("Contraseña incorrecta");
            }
            const hashedNewPassword = yield bcrypt_1.default.hash(new_password, 10);
            yield prisma.user.update({
                where: { mail },
                data: {
                    password: hashedNewPassword,
                },
            });
            return res.status(200).json("Contraseña actualizada correctamente");
        }
        catch (err) {
            return res.status(400).json("Error actualizacion de contreseña");
        }
    });
}
exports.updatePassword = updatePassword;
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Destination folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});
function uploadImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const upload = (0, multer_1.default)({ storage });
        upload.single('image')(req, res, (err) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (err) {
                    return res.status(400).json('Error uploading image: ' + err.message);
                }
                if (!req.file) {
                    return res.status(400).json('No image uploaded.');
                }
                const filename = req.file.filename;
                const userId = parseInt(req.params.id);
                const savedImage = yield prisma.image.create({
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
            }
            catch (err) {
                console.error(err);
                return res.status(500).json('Error uploading image');
            }
        }));
    });
}
exports.uploadImage = uploadImage;
function getLibery(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = parseInt(req.params.id);
        try {
            const user = yield prisma.user.findUnique({
                where: { id: userId },
                include: {
                    Image: true,
                },
            });
            if (!user) {
                return res.status(404).json("El usuario no existe");
            }
            return res.status(200).json(user.Image);
        }
        catch (err) {
            return res.status(400).json(err.message);
        }
    });
}
exports.getLibery = getLibery;
const getApodData = (req, res) => {
    const apiKey = "UJiVXjcI3Wg7Qdy2WGzUQVQUF37bJPvq7bIt6qJE";
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
};
exports.getApodData = getApodData;
