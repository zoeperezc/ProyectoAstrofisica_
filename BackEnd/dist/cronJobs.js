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
exports.updateDONKINews = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const axios_1 = __importDefault(require("axios"));
// Función para obtener y actualizar las noticias de DONKI
function updateDONKINews() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const apiKey = 'Rh1lUF8pDz1LYGwyv1O6I3IYgTxsv0jAxR9LlQnX';
            const response = yield axios_1.default.get(`https://api.nasa.gov/DONKI/notifications?api_key=${apiKey}`);
            // Aquí puedes manejar la respuesta de DONKI
            const newsData = response.data;
            // Realiza las acciones necesarias para almacenar o actualizar los datos en tu aplicación
            console.log(newsData);
        }
        catch (error) {
            console.error('Error al obtener noticias de DONKI:', error);
        }
    });
}
exports.updateDONKINews = updateDONKINews;
// Programa una tarea para ejecutar updateDONKINews todos los días a una hora específica (por ejemplo, a las 2 AM)
node_cron_1.default.schedule('30 0 * * *', () => {
    updateDONKINews();
});
