import inquirer from 'inquirer'

interface NameQuestion {
  name: string
}

export default async function askAnime(): Promise<string> {
  const { name } = await inquirer.prompt<NameQuestion>({
    name: 'name',
    message: 'Nome do anime:',
    type: 'input'
  })

  return name.toLowerCase()
}
