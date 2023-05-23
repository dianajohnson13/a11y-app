"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("../styles/IssueBlock.css");
const react_1 = require("react");
function Instance({ instance }) {
    return ((0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'issue-instance' }, { children: (0, jsx_runtime_1.jsx)("code", { children: instance }) })));
}
function IssueBlock({ issue: { code, message, instances } }) {
    const [showAll, setShowAll] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'issue' }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'issue-message' }, { children: message })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'issue-instance-list' }, { children: showAll ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [instances.map(instance => ((0, jsx_runtime_1.jsx)(Instance, { instance: instance }, instance))), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'secondary-btn', onClick: () => setShowAll(false) }, { children: "Show less" }))] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Instance, { instance: instances[0] }), instances.length > 1 ? ((0, jsx_runtime_1.jsxs)("p", { children: [`We found ${instances.length - 1} more instance${instances.length > 2 ? 's' : ''} of this issue. `, (0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'secondary-btn', onClick: () => setShowAll(true) }, { children: "Show all" }))] })) : null] })) })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'issue-code' }, { children: code }))] }), code));
}
exports.default = IssueBlock;
