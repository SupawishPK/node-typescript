"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.get("./", (req, res) => {
    const age = 39;
    res.json({ message: "Please Like this" });
});
app.listen("3001", () => {
    console.log("Server Running!");
});
