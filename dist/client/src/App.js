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
const jsx_runtime_1 = require("react/jsx-runtime");
require("./App.css");
const react_1 = require("react");
const MainSearch_1 = __importDefault(require("./components/MainSearch"));
const IssueBlock_1 = __importDefault(require("./components/IssueBlock"));
;
const fetchUrl = (newURL) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield fetch(`/api/test?url=${newURL}`);
    return resp.json();
});
const structureResults = ({ results: { documentTitle, pageUrl, issues } }) => {
    const issueGroups = {};
    issues.forEach(({ code, message, context }) => {
        if (issueGroups[code]) {
            issueGroups[code].instances.push(context);
        }
        else {
            issueGroups[code] = {
                code: code,
                message: message,
                instances: [context]
            };
        }
    });
    return {
        documentTitle,
        pageUrl,
        issueGroups
    };
};
function App() {
    const [data, setData] = (0, react_1.useState)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const handleSubmit = (newURL) => {
        if (newURL === "") { // handle invalid URL too
            // show error message under input
        }
        else {
            setLoading(true);
            fetchUrl(newURL)
                .then(result => {
                return structureResults(result);
            })
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
    const codes = data ? Object.keys(data.issueGroups) : [];
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "App" }, { children: [(0, jsx_runtime_1.jsx)("header", { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'header-content' }, { children: (0, jsx_runtime_1.jsx)("strong", { children: "A11y Checker" }) })) }), (0, jsx_runtime_1.jsxs)("main", { children: [(0, jsx_runtime_1.jsx)(MainSearch_1.default, { handleSubmit: handleSubmit }), loading && (0, jsx_runtime_1.jsx)("div", { children: "Loading..." }), data && data.issueGroups && codes && ((0, jsx_runtime_1.jsx)("div", { children: codes.map((code) => {
                            const issue = data ? data.issueGroups[code] : null;
                            return issue ? (0, jsx_runtime_1.jsx)(IssueBlock_1.default, { issue: issue }, code) : null;
                        }) }))] })] })));
}
exports.default = App;
