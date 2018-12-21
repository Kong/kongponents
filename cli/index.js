#!/usr/bin/env node

const CURR_DIR = process.cwd()

const program = require('commander')
const chalk = require('chalk')
const fs = require('fs')


const execSync = require('child_process').execSync;
const spawn = require('child_process').spawn;

function capitalizeFirstLetters (str, num) {
  return `${str.substring(0, num).toUpperCase()}${str.substr(num)}`
}

function parseName (name) {
  if (name[0].toLowerCase() !== 'k') {
    console.warn("Kongponents typically start with 'K'.")

    return capitalizeFirstLetters(name, 1)
  }

  return capitalizeFirstLetters(name, 2)
}

function createDirectoryContents (templatePath, newProjectPath, transformPath, transformContents) {
  const filesToCreate = fs.readdirSync(templatePath)

  return filesToCreate.map(file => {
    const origFilePath = `${templatePath}/${file}`
    const stats = fs.statSync(origFilePath)

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8')
      const writePath = `${newProjectPath}/${file}`

      fs.writeFileSync(transformPath(writePath), transformContents(contents), 'utf8')
    }

    return transformPath(file)
  })
}

function listComponent(kongponent) {
  execSync(`lerna list --scope=@kongponents/${kongponent.toLowerCase()}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
}

function listComponents() {
  execSync(`lerna list`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
}

function runTests(cb) {
  ls = spawn('yarn', ['test']);
  ls.stdout.on('data', function (data) {
    console.log(chalk.blue.bold(data.toString()));
  });
  // spawn swallows the syntax highlighting. This adds it back.
  ls.stderr.on('data', function (data) {
    fail = data.toString().match( /FAIL/ )
    pass = data.toString().match( /PASS/ )
    if (fail) {
      console.log(chalk.red.bold(data.toString()));
    } else if (pass) {
      console.log(chalk.green.bold(data.toString()));
    }
  });

  ls.on('close', function(code) {
    cb(code);
  });
}

program
  .version('0.0.1')

program
  .command('create <name>')
  .description('create a kongponent')
  .usage('[options] <name>')
  .option('-d, --kdescription [description]', 'Description of your Kongponent')
  .action(function (name, options) {
    if (!name) {
      console.error(chalk.red.bold('Missing Option: name. Please specify a name with -n'))

      return
    }

    // args
    const kname = parseName(name)
    const kdescription = options.kdescription || `${kname} description here.`

    // paths
    const templatePath = `${__dirname}/template`
    const packagesPath = 'packages'
    const componentPath = `${CURR_DIR}/${packagesPath}/${kname}`

    if (fs.existsSync(componentPath)) {
      throw Error(`${componentPath} already exists.`)
    }

    fs.mkdirSync(componentPath)

    const files = createDirectoryContents(
      templatePath,
      componentPath,
      path => path.replace(/KTemplate/g, kname),
      contents => contents
        .replace(/{%kongponent_name_lower%}/g, kname.toLowerCase())
        .replace(/{%kongponent_name%}/g, kname)
        .replace(/{%kongponent_description%}/g, kdescription))

    console.log(chalk.greenBright('Kongponent created!'))

    const { exec } = require('child_process')

    exec(`tree packages/${kname}`, (err, stdout) => {
      console.log('\nFiles generated:')
      if (err) {
        console.log(chalk.blue(files.join('\n')))

        return
      }

      // tree output
      console.log(chalk.blue(stdout))
    })
  })

program
  .command('publish <kongponent>')
  .description('publish kongponent')
  .action(function(kongponent) {
    if (!kongponent) {
      console.error(chalk.red.bold('Missing Option: kongponent. Please specify a name'))
      return
    }
    runTests(function(exitCode) {
      if (exitCode == 0) {
        // Currently execSync will barf on the interactive prompt from publishing your kongponent.
        // spawn and spawnSync will return the result of the child process, but you can't interact with it.
        console.log(`You did it! Tests have passed! Paste the following command in your prompt to publish your kongponent.`)
        console.log(chalk.greenBright(`\n lerna publish --npm-tag=latest --skip-git --scope=@kongponents/${kongponent.toLowerCase()}`))
      } else {
        console.log(`Tests have failed! Please check before publishing ${kongponent}`);
      }
    })

  });
  
program
  .command('find <kongponent>')
  .description('find package')
  .action(function(kongponent) {
    listComponent(kongponent)
  });

program
  .command('find-all')
  .description('find all packages')
  .action(function() {
    listComponents()
  });

program.parse(process.argv)