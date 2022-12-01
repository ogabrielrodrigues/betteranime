import { got } from 'got'
import { createWriteStream, existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pipeline } from 'node:stream/promises'
import ora from 'ora'

import normalizeAnimeName from './utils/normalizeAnimeName'

export default async function downloadEpisode(animeName: string, episode: string, iterator: number) {
  if (!existsSync(resolve('tmp', 'downloads', normalizeAnimeName(animeName)))) {
    await mkdir(resolve('tmp', 'downloads', normalizeAnimeName(animeName)))
  }

  const filename = `${normalizeAnimeName(animeName)}-${iterator}.mp4`

  const gotStream = got.stream(episode)
  const outStream = createWriteStream(resolve('tmp', 'downloads', normalizeAnimeName(animeName), filename))

  const spinner = ora().start(`Baixando ${filename}: ${Math.floor(gotStream.downloadProgress.percent * 100)}%`)

  gotStream.on('data', () => {
    spinner.text = `Baixando ${filename}: ${Math.floor(gotStream.downloadProgress.percent * 100)}%`
  })
  gotStream.on('end', () => {
    spinner.stop()
    console.log(`${filename} baixado com sucesso!`)
  })

  return await pipeline(gotStream, outStream)
}
