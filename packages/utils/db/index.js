const faker = require('faker')

module.exports = () => {
  const data = { user_list: [] }

  for (let i = 0; i < 100; i++) {
    data.user_list.push({
      id: faker.datatype.uuid(),
      name: faker.internet.userName(),
      email: faker.internet.email(),
      ip: faker.internet.ip(),
      job_area: faker.name.jobArea()
    })
  }

  return data
}
