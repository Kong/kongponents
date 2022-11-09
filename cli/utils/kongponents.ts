import pc from 'picocolors'
import fs from 'fs'
import { pascalCase, sleep, kongponentSrcPath, titleCaseComponentName, kongponentDocFilename } from './'
import { createSpinner, Spinner } from 'nanospinner'

/**
 * @description Create new files for Kongponent
 * @param {string} name Component name
 * @return {*}
 */
export async function createComponentFiles(name: string): Promise<void> {
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
    text: `Created src/components/${pc.cyan(componentName)} directory.`,
  })

  spinner.start({
    text: 'Creating component files...',
  })

  // Create new files in src/component/{KComponentName}
  // eslint-disable-next-line array-callback-return
  componentFilesToCreate.map((filename: string): void => {
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
    text: `Created the ${pc.cyan(componentName + '.vue')} and ${pc.cyan(componentName + '.cy.ts')} files.`,
  })

  spinner.start({
    text: 'Adding the new Kongponent to the exports in src/components/index.ts...',
  })

  // Add the component export to src/components/index.ts
  if (fs.existsSync('src/components/index.ts')) {
    if (!fs.readFileSync('src/components/index.ts').includes(componentName)) {
      // Add export to file
      fs.appendFileSync('src/components/index.ts', `export { default as ${componentName} } from './${componentName}/${componentName}.vue'\n`)

      spinner.success({
        text: `Added ${pc.cyan(componentName + '.vue')} to the exports in src/components/index.ts.`,
      })
    } else {
      // File already includes export
      spinner.error({
        text: pc.red(`Warning: ${componentName} is already exported from src/components/index.ts.`) + pc.yellow('\n  - Skipped adding the duplicate export to src/components/index.ts'),
      })
    }
  } else {
    // src/components/index.ts does not exist
    spinner.error({
      text: pc.red('Warning: src/components/index.ts does not exist.') + pc.yellow('\n  - You will need to manually add the new component to the export file.'),
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
      const newFilePath = `docs/components/${filename.replace(/Template/g, kongponentDocFilename(name))}`

      // Check to ensure docs/components/{name} file does not already exist
      if (fs.existsSync(newFilePath)) {
        docsFileExists = true

        spinner.error({
          text: pc.red(`Warning: ${newFilePath} already exists.`) + pc.yellow('\n  - Skipped docs markdown file generation as to not overwrite the existing file.'),
        })
      } else {
        // Replace template strings
        const fileContent = fs.readFileSync(originalFilePath, 'utf8')
          .replace(/{%%KONGPONENT_NAME%%}/g, componentName)
          .replace(/{%%KONGPONENT_NAME_TITLE_CASE%%}/g, componentNameTitleCase)

        fs.writeFileSync(newFilePath, fileContent, 'utf8')

        spinner.success({
          text: `Created the docs/components/${pc.cyan(kongponentDocFilename(name) + '.md')} file.`,
        })
      }

      spinner.start({
        text: 'Verifying file structure...',
      })

      const docsFile = docsFileExists === false ? `${kongponentDocFilename(name)}.md` : pc.yellow(`${kongponentDocFilename(name)}.md (already existed, not modified)`)

      spinner.success({
        text: `Created the new '${componentName}' Kongponent and its related files:

    ├── docs/
    │   └── components/
    │       └── ${docsFile}
    └── src/
        └── components/
            └── ${componentName}/
              ├── ${componentName}.cy.ts
              └── ${componentName}.vue
    `,
      })

      console.log(`${pc.bold('Note')}: You will need to manually add the new ${pc.cyan(kongponentDocFilename(name) + '.md')} file to \n      the VuePress sidebar in docs/.vuepress/config.ts.`)
      // Empty line
      console.log('')
    }
  })
}
