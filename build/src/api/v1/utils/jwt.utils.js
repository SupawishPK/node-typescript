"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.sign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const privateKey = config_1.default.get('privateKey');
function sign(object, options) {
    return jsonwebtoken_1.default.sign(object, privateKey, options);
}
exports.sign = sign;
function decode(token) {
    try {
        // ทำการ decoded jwt token
        const decoded = jsonwebtoken_1.default.verify(token, privateKey);
        // console.log("decoded: ",decoded)
        //return ค่า decoded กลับไป
        return { valid: true, expired: false, decoded };
    }
    catch (error) {
        // หาก decoded ไม่สำเร็จ หรือ jwt Token หมดอายุ
        //console.log({ error })
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null,
        };
    }
}
exports.decode = decode;
