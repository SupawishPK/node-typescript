"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("./config/logger"));
const DatabaseConfig_1 = __importDefault(require("./config/DatabaseConfig"));
const routes_1 = __importDefault(require("./api/v1/routes"));
const middlewares_1 = require("./api/v1/middlewares");
const port = config_1.default.get('port');
const host = config_1.default.get('host');
const app = express_1.default();
//เรียกใช้ middleware deserializeUser สิ่งนี้จะเเนบ user ให้กับทุก routes แบบนี้ get(req, 'user')
app.use(middlewares_1.deserializeUser);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.listen(port, host, () => {
    logger_1.default.info(`Server listing at http://${host}:${port}`);
    DatabaseConfig_1.default();
    //routes
    routes_1.default(app);
});
