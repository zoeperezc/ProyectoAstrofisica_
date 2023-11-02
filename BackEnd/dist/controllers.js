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
exports.app = exports.prisma = exports.updatePassword = exports.updateUser = exports.logInUser = exports.createUser = exports.getUser = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const multer_1 = __importDefault(require("multer"));
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
const app = (0, express_1.default)(); // aplicación Express
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
        const { name, mail, password } = req.body;
        try {
            const emailExists = yield prisma.user.findUnique({
                where: {
                    mail,
                },
            });
            if (emailExists) {
                return res.status(400).json("Mail already exists in the database");
            }
            const hashed_password = yield bcrypt_1.default.hash(password, 10);
            const user = yield prisma.user.create({
                data: {
                    name,
                    mail,
                    password: hashed_password,
                },
            });
            return res.status(201).json(user);
        }
        catch (err) {
            return res.status(400).json("Error");
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
            return res.status(400).json("Error");
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
            return res.status(400).json("Error");
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
            return res.status(400).json("Error");
        }
    });
}
exports.updatePassword = updatePassword;
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // carpeta de destino
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // Generar unique
        cb(null, uniqueSuffix + "-" + file.originalname); // Renombrar el archivo
    },
});
const upload = (0, multer_1.default)({ storage });
app.post("/upload-image", upload.single("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json("No se ha subido ninguna imagen.");
        }
        // Aquí puedes guardar el nombre de la imagen (req.file.filename) en la base de datos
        // Puedes usar Prisma o la herramienta que estés utilizando para interactuar con la base de datos
        return res.status(201).json("Imagen subida correctamente.");
    }
    catch (err) {
        console.error(err);
        return res.status(500).json("Error al subir la imagen.");
    }
}));
