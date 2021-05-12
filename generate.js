const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const {formatDate} = require('./format-date')

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
