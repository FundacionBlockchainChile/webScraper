const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const url = 'https://www.emol.com/'

axios(url)
  .then((response) => {
    const html = response.data
    const $ = cheerio.load(html)

    // ARTICLES
    const articles = []
    $('h3 a', html).each(function () {
      const title = $(this).text().split('  ').pop()
      // title = title.split("   ").pop()
      const url = $(this).attr('href')
      if (title !== '')
        articles.push({
          title,
          url,
        })
    })

    // NAVBAR SECTIONS
    const navBarItems = []
    $('nav li a').each(function () {
      const section = $(this).text()
      if (section !== '') navBarItems.push(section)
    })

    console.log(articles)
    console.log(navBarItems)
  })
  .catch((err) => console.error(err))

app.listen(PORT, () => console.log(`Server Running on PORT... ${PORT}`))
