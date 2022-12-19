import { Browser } from 'puppeteer'

import downloadEpisode from './downloadEpisodes'
import Anime from './index'
import normalizeAnimeName from './utils/normalizeAnimeName'

export default async function collectDownloadURLs(anime: Anime, browser: Browser) {
  const page = await browser.newPage()
  await page.goto(anime.url)

  console.log(`Coletando informações sobre: ${anime.title}`)

  const numberOfEpisodes = await page.$eval('.anime-info p:nth-child(8) span', (episodesNumber: HTMLSpanElement) => {
    return parseInt(episodesNumber.innerText)
  })

  console.log(`Total de episódios: ${numberOfEpisodes}`)

  const episodes = await page.$$eval('#episodesList > li > div > a:nth-child(3)', (elements: HTMLAnchorElement[]) =>
    [...elements].map(a => a.href)
  )

  const collectedURLs = []

  for await (const episode of episodes) {
    await page.goto(episode)
    const downloadURL = await page.$eval('.mt-4 a:last-child', (anchor: HTMLAnchorElement) => anchor.href)

    await page.goto(downloadURL)

    await page.click('.mb-5.btn.btn-warning', { delay: 500 })
    await page.waitForSelector('.mb-5.btn.btn-primary')
    const episodeURL = await page.$eval('.mb-5.btn.btn-primary', (anchor: HTMLAnchorElement) => anchor.href)
    collectedURLs.push(episodeURL)
  }

  await browser.close()
  let i = 1
  for await (const url of collectedURLs) {
    await downloadEpisode(anime.title, url, i)
    i++
  }

  return normalizeAnimeName(anime.title)
}
