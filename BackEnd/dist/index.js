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
exports.lastUpdated = exports.news = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cronJobs_1 = require("./cronJobs");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(router_1.default);
exports.news = [];
exports.lastUpdated = new Date();
node_cron_1.default.schedule('*/15 * * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    exports.news = yield (0, cronJobs_1.updateDONKINews)();
    exports.lastUpdated = new Date();
}));
const PORT = 3000;
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Server is alive on localhost:" + PORT);
}));
exports.default = router_1.default;
