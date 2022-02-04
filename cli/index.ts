#!/usr/bin/env node

import chalk from 'chalk'
import boxen from 'boxen'
import inquirer from 'inquirer'
import emoji from 'node-emoji'
import { kebabCase, pascalCase, kongponentSrcPath, createComponentFiles } from './utils'
import fs from 'fs'

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'What is the kebab-case name of the new Kongponent?',
    filter: async (input: string): Promise<string> => kebabCase(input).replace(/[^a-z-]/gi, ''),
    validate: async (input: string) => {
      if (!input.startsWith('k-')) {
        return 'The name of a Kongponents should start with \'k-\''
      } else if (input.includes('--')) {
        return 'The name should not include a double-dash \'--\''
      } else if (input.endsWith('-')) {
        return 'The name should not end with a dash.'
      } else if (fs.existsSync(kongponentSrcPath(input))) {
        // Kongponent already exists
        return `Error: ${pascalCase(input)} already exists`
      }
      return true
    },
  },
  {
    type: 'input',
    name: 'description',
    message: 'Provide a description for the new component',
  },
]

const createKongponent = async (): Promise<void> => {
  console.clear()

  console.log(boxen(chalk.cyanBright.bold(`${emoji.get('sparkles')} Create a new Kongponent ${emoji.get('sparkles')}`), { margin: 1, padding: 2 }))

  const answers = await inquirer.prompt(questions)

  // Insert an empty after answering the questions
  console.log('')

  // Create src/component files
  await createComponentFiles(answers.name, answers.description)
}

createKongponent()
