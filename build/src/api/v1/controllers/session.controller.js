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
exports.invalidateUserSessionHandler = exports.createUserSessionHandler = void 0;
const config_1 = __importDefault(require("config"));
const lodash_1 = require("lodash");
const session_service_1 = require("../services/session.service");
const user_service_1 = require("../services/user.service");
const jwt_utils_1 = require("../utils/jwt.utils");
function createUserSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //validate the email and password
        const user = yield user_service_1.validatePassword(req.body);
        console.log("user: ", user);
        if (!user) {
            return res.status(401).send('Invalid username or password');
        }
        //create a session
        const session = yield session_service_1.createSession(user._id, req.get('user-agent') || '');
        console.log("session: ", session);
        //create access token
        const accessToken = yield session_service_1.createAccessToken({ user, session });
        console.log("accessToken: ", accessToken);
        //create refresh token
        const refreshToken = jwt_utils_1.sign(session, {
            expiresIn: config_1.default.get('refreshTokenTtl'), // 1 year
        });
        //send refresh & access token back
        return res.send({ accessToken, refreshToken });
    });
}
exports.createUserSessionHandler = createUserSessionHandler;
function invalidateUserSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const sessionId = lodash_1.get(req, "user.session");
        //req,'user.session' ได้มาจาก deserializeUser โดยได้แนบมากับ request
        yield session_service_1.updateSession({ _id: sessionId }, { valid: false });
        return res.sendStatus(200);
    });
}
exports.invalidateUserSessionHandler = invalidateUserSessionHandler;
