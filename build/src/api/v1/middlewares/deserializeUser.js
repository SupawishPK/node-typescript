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
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const jwt_utils_1 = require("../utils/jwt.utils");
const session_service_1 = require("../services/session.service");
const deserializeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //รับ accessToken จาก BearerToken ที่ Authorization
    const accessToken = lodash_1.get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');
    //รับ refreshToken จาก header : x-refresh
    const refreshToken = lodash_1.get(req, 'headers.x-refresh');
    //ถ้าไม่มี accessToken return 403 Forbidden
    if (!accessToken)
        return next();
    // ประกาศ decoded, expired มารับค่า return หลังจาก decode
    // return { 
    //   valid: true, 
    //   expired: false, 
    //   decoded 
    // }
    const { decoded, expired } = jwt_utils_1.decode(accessToken);
    //console.log(decoded) //ค่าที่ได้จากการ decoded
    //console.log(expired) //expired: false
    //ถ้า jwt Token ไม่หมดอายุ โดยสามารถ decoded ได้
    if (decoded) {
        // @ts-ignore //กำหนดให้ req.user = decoded
        req.user = decoded;
        return next();
    }
    //ถ้า jwt Token หมดอายุ ไม่สามารถ decoded ได้
    //เช็คว่ามี expired !== false && มี refreshToken
    if (expired && refreshToken) {
        const newAccessToken = yield session_service_1.reIssueAccessToken({ refreshToken });
        if (newAccessToken) {
            // Add the new access token to the response header
            res.setHeader('x-access-token', newAccessToken);
            const { decoded } = jwt_utils_1.decode(newAccessToken);
            // @ts-ignore
            req.user = decoded;
        }
        return next();
    }
    return next();
});
exports.default = deserializeUser;
