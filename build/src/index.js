"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("./config/logger"));
const DatabaseConfig_1 = __importDefault(require("./config/DatabaseConfig"));
const routes_1 = __importDefault(require("./routes"));
const port = config_1.default.get('port');
const host = config_1.default.get('host');
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get('./', (req, res) => {
    const age = 39;
    res.json({ message: 'Please Like this' });
});
//middleware
app.use('/api/users', routes_1.default);
app.listen(port, host, () => {
    logger_1.default.info(`Server listing at http://${host}:${port}`);
    DatabaseConfig_1.default();
    routes_1.default(app);
});
