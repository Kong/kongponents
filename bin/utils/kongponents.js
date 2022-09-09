"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComponentFiles = void 0;
const tslib_1 = require("tslib");
const picocolors_1 = tslib_1.__importDefault(require("picocolors"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const _1 = require("./");
const nanospinner_1 = require("nanospinner");
/**
 * @description Create new files for Kongponent
 * @param {string} name Component name
 * @return {*}
 */
function createComponentFiles(name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const spinner = (0, nanospinner_1.createSpinner)('Creating new Kongponent...').start({ color: 'cyan' });
        yield (0, _1.sleep)();
        const componentName = (0, _1.pascalCase)(name); // e.g. KButton
        const componentNameTitleCase = (0, _1.titleCaseComponentName)(name); // e.g. Button
        //
        // SOURCE FILES
        // =========================
        const componentFilesTemplatePath = 'cli/template';
        const componentFilesToCreate = fs_1.default.readdirSync(componentFilesTemplatePath);
        // Check to ensure src/components/{KComponentName} directory does not already exist
        if (fs_1.default.existsSync((0, _1.kongponentSrcPath)(name))) {
            spinner.error({
                text: `Error: ${componentName} already exists`,
            });
            process.exit(1);
        }
        spinner.success({
            text: 'Verified that Kongponent does not already exist.',
        });
        spinner.start({
            text: 'Creating new Kongponent directory...',
        });
        // Create new Kongponent directory src/components/{KComponentName}
        fs_1.default.mkdirSync((0, _1.kongponentSrcPath)(name));
        spinner.success({
            text: `Created src/components/${picocolors_1.default.cyan(componentName)} directory.`,
        });
        spinner.start({
            text: 'Creating component files...',
        });
        // Create new files in src/component/{KComponentName}
        // eslint-disable-next-line array-callback-return
        componentFilesToCreate.map((filename) => {
            const originalFilePath = `${componentFilesTemplatePath}/${filename}`;
            const stats = fs_1.default.statSync(originalFilePath);
            // If template files exist
            if (stats.isFile()) {
                const newFilePath = `${(0, _1.kongponentSrcPath)(componentName)}/${filename.replace(/Template/g, componentName)}`;
                // Replace template strings
                const fileContent = fs_1.default.readFileSync(originalFilePath, 'utf8').replace(/{%%KONGPONENT_NAME%%}/g, componentName);
                fs_1.default.writeFileSync(newFilePath, fileContent, 'utf8');
            }
        });
        spinner.success({
            text: `Created the ${picocolors_1.default.cyan(componentName + '.vue')} and ${picocolors_1.default.cyan(componentName + '.spec.ts')} files.`,
        });
        spinner.start({
            text: 'Adding the new Kongponent to the exports in src/components/index.ts...',
        });
        // Add the component export to src/components/index.ts
        if (fs_1.default.existsSync('src/components/index.ts')) {
            if (!fs_1.default.readFileSync('src/components/index.ts').includes(componentName)) {
                // Add export to file
                fs_1.default.appendFileSync('src/components/index.ts', `export { default as ${componentName} } from './${componentName}/${componentName}.vue'\n`);
                spinner.success({
                    text: `Added ${picocolors_1.default.cyan(componentName + '.vue')} to the exports in src/components/index.ts.`,
                });
            }
            else {
                // File already includes export
                spinner.error({
                    text: picocolors_1.default.red(`Warning: ${componentName} is already exported from src/components/index.ts.`) + picocolors_1.default.yellow('\n  - Skipped adding the duplicate export to src/components/index.ts'),
                });
            }
        }
        else {
            // src/components/index.ts does not exist
            spinner.error({
                text: picocolors_1.default.red('Warning: src/components/index.ts does not exist.') + picocolors_1.default.yellow('\n  - You will need to manually add the new component to the export file.'),
            });
        }
        //
        // DOCS FILES
        // =========================
        const docsFilesTemplatePath = 'cli/template/docs';
        const docsFilesToCreate = fs_1.default.readdirSync(docsFilesTemplatePath);
        spinner.start({
            text: 'Verifying the docs/components directory exists...',
        });
        // Check to ensure docs/components directory exists, if not, create it
        if (!fs_1.default.existsSync('docs/components')) {
            fs_1.default.mkdirSync('docs/components');
            spinner.success({
                text: 'Created the missing docs/components directory.',
            });
        }
        else {
            spinner.success({
                text: 'Verified the docs/components directory exists.',
            });
        }
        spinner.start({
            text: 'Creating the component markdown file for the docs...',
        });
        // Create new docs files in docs/components/{name}
        docsFilesToCreate.map((filename) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const originalFilePath = `${docsFilesTemplatePath}/${filename}`;
            const stats = fs_1.default.statSync(originalFilePath);
            let docsFileExists = false;
            // If template file exists
            if (stats.isFile()) {
                const newFilePath = `docs/components/${filename.replace(/Template/g, (0, _1.kongponentDocFilename)(name))}`;
                // Check to ensure docs/components/{name} file does not already exist
                if (fs_1.default.existsSync(newFilePath)) {
                    docsFileExists = true;
                    spinner.error({
                        text: picocolors_1.default.red(`Warning: ${newFilePath} already exists.`) + picocolors_1.default.yellow('\n  - Skipped docs markdown file generation as to not overwrite the existing file.'),
                    });
                }
                else {
                    // Replace template strings
                    const fileContent = fs_1.default.readFileSync(originalFilePath, 'utf8')
                        .replace(/{%%KONGPONENT_NAME%%}/g, componentName)
                        .replace(/{%%KONGPONENT_NAME_TITLE_CASE%%}/g, componentNameTitleCase);
                    fs_1.default.writeFileSync(newFilePath, fileContent, 'utf8');
                    spinner.success({
                        text: `Created the docs/components/${picocolors_1.default.cyan((0, _1.kongponentDocFilename)(name) + '.md')} file.`,
                    });
                }
                spinner.start({
                    text: 'Verifying file structure...',
                });
                const docsFile = docsFileExists === false ? `${(0, _1.kongponentDocFilename)(name)}.md` : picocolors_1.default.yellow(`${(0, _1.kongponentDocFilename)(name)}.md (already existed, not modified)`);
                spinner.success({
                    text: `Created the new '${componentName}' Kongponent and its related files:

    ├── docs/
    │   └── components/
    │       └── ${docsFile}
    └── src/
        └── components/
            └── ${componentName}/
              ├── ${componentName}.spec.ts
              └── ${componentName}.vue
    `,
                });
                console.log(`${picocolors_1.default.bold('Note')}: You will need to manually add the new ${picocolors_1.default.cyan((0, _1.kongponentDocFilename)(name) + '.md')} file to \n      the VuePress sidebar in docs/.vuepress/config.ts.`);
                // Empty line
                console.log('');
            }
        }));
    });
}
exports.createComponentFiles = createComponentFiles;
//# sourceMappingURL=kongponents.js.map