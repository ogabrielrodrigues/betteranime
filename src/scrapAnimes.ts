import { Browser } from 'puppeteer'

import askAnimeName from './askAnimeName'

export default async function scrapAnimes(baseURL: string, browser: Browser) {
  const anime = await askAnimeName()

  const page = await browser.newPage()
  await page.goto(`${baseURL}/pesquisa?titulo=${anime}&searchTerm=${anime}`)

  return await page.$$eval('.list-animes.row article a', (elements: HTMLAnchorElement[]) => {
    return [...elements].map(element => ({ url: element.href, title: element.title }))
  })
}
