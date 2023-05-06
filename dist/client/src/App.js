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
const jsx_runtime_1 = require("react/jsx-runtime");
require("./App.css");
const react_1 = require("react");
;
const fetchUrl = (newURL) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield fetch(`/api/test?url=${newURL}`);
    return resp.json();
});
function App() {
    let [data, setData] = (0, react_1.useState)();
    let [loading, setLoading] = (0, react_1.useState)(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        let newURL = document.getElementById('urlInput').value;
        if (newURL === "") { // handle invalid URL too
            // show error message under input
        }
        else {
            setLoading(true);
            fetchUrl(newURL)
                .then(data => {
                console.log(data);
                setData(data);
                setLoading(false);
            })
                .catch(error => {
                console.log(error.message);
                setLoading(false);
            });
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "App" }, { children: [(0, jsx_runtime_1.jsx)("header", { className: "App-header" }), (0, jsx_runtime_1.jsxs)("main", { children: [(0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: handleSubmit }, { children: [(0, jsx_runtime_1.jsxs)("label", Object.assign({ htmlFor: "urlInput" }, { children: ["Enter a URL: ", (0, jsx_runtime_1.jsx)("input", { id: "urlInput" })] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "submit" }, { children: "Run Test" }))] })), loading && (0, jsx_runtime_1.jsx)("div", { children: "Loading..." }), data && ((0, jsx_runtime_1.jsx)("div", { children: data.results.issues.map((issue, idx) => {
                            return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { children: issue.message }), (0, jsx_runtime_1.jsx)("p", { children: issue.context }), (0, jsx_runtime_1.jsx)("p", { children: issue.code })] }, idx));
                        }) }))] })] })));
}
exports.default = App;
