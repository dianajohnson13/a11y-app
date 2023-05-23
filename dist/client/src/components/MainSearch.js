"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("../styles/MainSearch.css");
const search_svg_1 = __importDefault(require("../assets/search.svg"));
function MainSearch({ handleSubmit }) {
    const onSubmit = (event) => {
        event.preventDefault();
        let newURL = document.getElementById('urlInput').value;
        handleSubmit(newURL);
    };
    return ((0, jsx_runtime_1.jsx)("form", Object.assign({ onSubmit: onSubmit }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'search-container' }, { children: [(0, jsx_runtime_1.jsx)("input", { id: "urlInput", "aria-label": "Enter a URL", placeholder: "Enter a URL" }), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "submit" }, { children: (0, jsx_runtime_1.jsx)("img", { src: search_svg_1.default }) }))] })) })));
}
exports.default = MainSearch;
