import inquirer from 'inquirer'

import Anime from './index'

interface AnimeQuestion {
  anime: string
}

export default async function askAndChooseAnime(animes: Anime[]): Promise<Anime> {
  const { anime } = await inquirer.prompt<AnimeQuestion>({
    name: 'anime',
    message: 'Escolha um anime:',
    type: 'rawlist',
    choices: animes.map(anime => anime.title)
  })

  return animes.find(a => a.title === anime)
}
