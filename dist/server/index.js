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
const express_1 = __importDefault(require("express"));
const pa11y_1 = __importDefault(require("pa11y"));
const app = (0, express_1.default)();
exports.default = app;
// routes to be moved
app.get("/hello", (req, res) => {
    res.json({ message: "Hello from server!" });
});
app.get('/api/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = req.query.url;
    if (!url) {
        res.status(400).json({ error: 'Missing URL' });
    }
    else {
        const results = yield (0, pa11y_1.default)(url);
        res.status(200).json({ results });
    }
}));
