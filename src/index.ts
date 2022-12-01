/**
 *  Better Anime Downloader 👌
 *
 *  1. Pergunta o nome do anime.
 *  2. Coleta dados do https://betteranime.net.
 *  3. Baixa os episodios.
 *  4. Comprime tudo em um .zip.
 **/

import puppeteer from 'puppeteer'

import askAndChooseAnime from './askAndChooseAnime'
import collectDownloadURLs from './collectDownloadURLs'
import scrapAnimes from './scrapAnimes'
import zipEpisodes from './zipEpisodes'

const baseURL = 'https://betteranime.net'

export default interface Anime {
  url: string
  title: string
}

async function bootstrap() {
  const browser = await puppeteer.launch()

  const animes = await scrapAnimes(baseURL, browser)
  const anime = await askAndChooseAnime(animes)
  const downloadedEpisodesPath = await collectDownloadURLs(anime, browser)

  await zipEpisodes(downloadedEpisodesPath)
  process.exit(0)
}

bootstrap()
