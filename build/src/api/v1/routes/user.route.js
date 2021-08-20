"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("../../../schema/user.schema");
const user_controller_1 = require("../controllers/user.controller");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
function default_1(app) {
    //Register User
    app.post('/register', validateRequest_1.default(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
    //Login User
    app.post('/sessions'
    // validateRequest(createUserSessionSchema),
    // createUserSessionHandler
    );
}
exports.default = default_1;
