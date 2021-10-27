const faker = require('faker')

module.exports = () => {
  const data = { project_list: [] }

  for (let i = 0; i < 100; i++) {
    data.project_list.push({
      id: faker.datatype.uuid(),
      name: faker.system.fileName(),
      version: faker.system.semver(),
      contributors: faker.datatype.number(1000),
      git_sha: faker.git.shortSha()
    })
  }

  return data
}
