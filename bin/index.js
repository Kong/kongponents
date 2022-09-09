#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const picocolors_1 = tslib_1.__importDefault(require("picocolors"));
const boxen_1 = tslib_1.__importDefault(require("boxen"));
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const node_emoji_1 = tslib_1.__importDefault(require("node-emoji"));
const utils_1 = require("./utils");
const fs_1 = tslib_1.__importDefault(require("fs"));
const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the kebab-case name of the new Kongponent?',
        filter: (input) => tslib_1.__awaiter(void 0, void 0, void 0, function* () { return (0, utils_1.kebabCase)(input).replace(/[^a-z-]/gi, ''); }),
        validate: (input) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            if (!input.startsWith('k-')) {
                return 'The name of a Kongponents should start with \'k-\'';
            }
            else if (input.includes('--')) {
                return 'The name should not include a double-dash \'--\'';
            }
            else if (input.endsWith('-')) {
                return 'The name should not end with a dash.';
            }
            else if (fs_1.default.existsSync((0, utils_1.kongponentSrcPath)(input))) {
                // Kongponent already exists
                return `Error: ${(0, utils_1.pascalCase)(input)} already exists`;
            }
            return true;
        }),
    },
];
const createKongponent = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    console.clear();
    console.log((0, boxen_1.default)(picocolors_1.default.cyan(picocolors_1.default.bold(`${node_emoji_1.default.get('sparkles')} Create a new Kongponent ${node_emoji_1.default.get('sparkles')}`)), { margin: 1, padding: 2 }));
    const answers = yield inquirer_1.default.prompt(questions);
    // Insert an empty after answering the questions
    console.log('');
    // Create src/component files
    yield (0, utils_1.createComponentFiles)(answers.name);
});
createKongponent();
//# sourceMappingURL=index.js.map