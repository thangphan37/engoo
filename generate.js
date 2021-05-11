const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')

const padLeft0 = (n) => n.toString().padStart(2, '0')
const formatDate = (d) =>
  `${d.getFullYear()}-${padLeft0(d.getMonth() + 1)}-${padLeft0(d.getDate())}`

async function generateNew({
  serialize = JSON.parse,
  deserialize = JSON.stringify,
} = {}) {
  // getCurrentData
  const data = fs.readFileSync(path.join('./data.json'), 'utf8')

  const {title, link} = await inquirer.prompt([
    {
      type: 'title',
      name: 'title',
      message: 'News title',
    },
    {
      type: 'link',
      name: 'link',
      message: 'Link of the news',
    },
  ])

  const date = formatDate(new Date())
  const dataParsed = serialize(data)
  const newData = {
    news: [...dataParsed.news, {title, link, date}],
  }

  fs.writeFileSync(path.join('./data.json'), deserialize(newData))
  console.log('You are okay!')
}

generateNew()
