import { rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import ora from 'ora'
import { zip } from 'zip-a-folder'

export default async function zipEpisodes(episodesPath: string) {
  const spinner = ora().start('Compactando.')
  await zip(resolve('tmp', 'downloads', episodesPath), resolve('tmp', 'downloads', `${episodesPath}.zip`))
  spinner.text = 'Compactando..'
  await rm(resolve('tmp', 'downloads', episodesPath), { force: true, recursive: true })
  spinner.text = 'Compactando...'
  spinner.stop()
}
