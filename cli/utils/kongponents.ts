import chalk from 'chalk'
import fs from 'fs'
import { pascalCase, sleep, kongponentSrcPath, titleCaseComponentName, kongponentDocFilename } from './'
import { createSpinner, Spinner } from 'nanospinner'

/**
 * @description Create new files for Kongponent
 * @param {string} name Component name
 * @param {string} description Component description
 * @return {*}
 */
export async function createComponentFiles(name: string, description: string): Promise<void> {
  const spinner: Spinner = createSpinner('Creating new Kongponent...').start({ color: 'cyan' })
  await sleep()

  const componentName = pascalCase(name) // e.g. KButton
  const componentNameTitleCase = titleCaseComponentName(name) // e.g. Button

  //
  // SOURCE FILES
  // =========================
  const componentFilesTemplatePath = 'cli/template'
  const componentFilesToCreate = fs.readdirSync(componentFilesTemplatePath)

  // Check to ensure src/components/{KComponentName} directory does not already exist
  if (fs.existsSync(kongponentSrcPath(name))) {
    spinner.error({
      text: `Error: ${componentName} already exists`,
    })
    process.exit(1)
  }

  spinner.success({
    text: 'Verified that Kongponent does not already exist.',
  })

  spinner.start({
    text: 'Creating new Kongponent directory...',
  })

  // Create new Kongponent directory src/components/{KComponentName}
  fs.mkdirSync(kongponentSrcPath(name))

  spinner.success({
    text: `Created src/components/${chalk.cyan(componentName)} directory.`,
  })

  spinner.start({
    text: 'Creating component files...',
  })

  // Create new files in src/component/{KComponentName}
  componentFilesToCreate.map(filename => {
    const originalFilePath = `${componentFilesTemplatePath}/${filename}`
    const stats = fs.statSync(originalFilePath)

    // If template files exist
    if (stats.isFile()) {
      const newFilePath = `${kongponentSrcPath(componentName)}/${filename.replace(/Template/g, componentName)}`
      // Replace template strings
      const fileContent = fs.readFileSync(originalFilePath, 'utf8').replace(/{%%KONGPONENT_NAME%%}/g, componentName)

      fs.writeFileSync(newFilePath, fileContent, 'utf8')
    }
  })

  spinner.success({
    text: `Created the ${chalk.cyan(componentName + '.vue')} and ${chalk.cyan(componentName + '.spec.ts')} files.`,
  })

  spinner.start({
    text: 'Adding the new Kongponent to the exports in src/components/index.ts...',
  })

  // Add the component export to src/components/index.ts
  if (fs.existsSync('src/components/index.ts')) {
    if (!fs.readFileSync('src/components/index.ts').includes(componentName)) {
      // Add export to file
      fs.appendFileSync('src/components/index.ts', `export { default as ${ componentName } } from './${ componentName }/${ componentName }.vue'\n`)

      spinner.success({
        text: `Added ${chalk.cyan(componentName + '.vue')} to the exports in src/components/index.ts.`,
      })
    } else {
      // File already includes export
      spinner.error({
        text: chalk.red(`Warning: ${componentName} is already exported from src/components/index.ts.`) + chalk.yellow('\n  - Skipped adding the duplicate export to src/components/index.ts'),
      })
    }
  } else {
    // src/components/index.ts does not exist
    spinner.error({
      text: chalk.red('Warning: src/components/index.ts does not exist.') + chalk.yellow('\n  - You will need to manually add the new component to the export file.'),
    })
  }

  //
  // DOCS FILES
  // =========================
  const docsFilesTemplatePath = 'cli/template/docs'
  const docsFilesToCreate = fs.readdirSync(docsFilesTemplatePath)

  spinner.start({
    text: 'Verifying the docs/components directory exists...',
  })

  // Check to ensure docs/components directory exists, if not, create it
  if (!fs.existsSync('docs/components')) {
    fs.mkdirSync('docs/components')
    spinner.success({
      text: 'Created the missing docs/components directory.',
    })
  } else {
    spinner.success({
      text: 'Verified the docs/components directory exists.',
    })
  }

  spinner.start({
    text: 'Creating the component markdown file for the docs...',
  })

  // Create new docs files in docs/components/{name}
  docsFilesToCreate.map(async (filename) => {
    const originalFilePath = `${docsFilesTemplatePath}/${filename}`
    const stats = fs.statSync(originalFilePath)
    let docsFileExists = false

    // If template file exists
    if (stats.isFile()) {
      const newFilePath = `docs/components/${ filename.replace(/Template/g, kongponentDocFilename(name)) }`

      // Check to ensure docs/components/{name} file does not already exist
      if (fs.existsSync(newFilePath)) {
        docsFileExists = true

        spinner.error({
          text: chalk.red(`Warning: ${newFilePath} already exists.`) + chalk.yellow('\n  - Skipped docs markdown file generation as to not overwrite the existing file.'),
        })
      } else {
        // Replace template strings
        const fileContent = fs.readFileSync(originalFilePath, 'utf8')
          .replace(/{%%KONGPONENT_NAME%%}/g, componentName)
          .replace(/{%%KONGPONENT_NAME_TITLE_CASE%%}/g, componentNameTitleCase)
          .replace(/{%%KONGPONENT_DESCRIPTION%%}/g, description)

        fs.writeFileSync(newFilePath, fileContent, 'utf8')

        spinner.success({
          text: `Created the docs/components/${chalk.cyan(kongponentDocFilename(name) + '.md')} file.`,
        })
      }

      spinner.start({
        text: 'Verifying file structure...',
      })

      const docsFile = docsFileExists === false ? `${kongponentDocFilename(name)}.md` : chalk.yellow(`${kongponentDocFilename(name)}.md (already existed, not modified)`)

      spinner.success({
        text: `Created the new '${ componentName }' Kongponent and its related files:

    ├── docs/
    │   └── components/
    │       └── ${docsFile}
    └── src/
        └── components/
            └── ${ componentName }/
              ├── ${ componentName }.spec.ts
              └── ${ componentName }.vue
    `,
      })

      console.log(`${ chalk.bold('Note') }: You will need to manually add the new ${ chalk.cyan(kongponentDocFilename(name) + '.md') } file to the VuePress sidebar.`)
      // Empty line
      console.log('')
    }
  })
}
