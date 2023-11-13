"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers = __importStar(require("./controllers"));
const index_1 = require("./index");
const router = (0, express_1.Router)();
router.post("/register", controllers.createUser); //user registration
router.post("/login", controllers.logInUser); // login
router.get("/indice", (_, res) => {
    // "indice.html" como respuesta
    const fs = require("fs");
    const path = require("path");
    const indexPath = path.join(__dirname, "indice.html");
    fs.readFile(indexPath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error al cargar la página 'indice.html'");
        }
        else {
            res.status(200).send(data);
        }
    });
});
router.get("/apod-data", controllers.getApodData); // ImageOftheDayApi
router.get("/user/:id", controllers.getUser); // id user
router.put("/user/:id", controllers.updateUser); // update user info
router.put("/user/:id/password", controllers.updatePassword); // update user password
router.post("/upload-image", controllers.uploadImage); // user image to analize
router.get("/user/:id/history", controllers.getLibery);
router.get('/NASA-news', (req, res) => {
    res.status(200).json({ data: index_1.news, lastUpdated: index_1.lastUpdated });
});
exports.default = router;
