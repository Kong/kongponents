"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./strings"), exports);
tslib_1.__exportStar(require("./kongponents"), exports);
function sleep(ms = 2200) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.sleep = sleep;
//# sourceMappingURL=index.js.map