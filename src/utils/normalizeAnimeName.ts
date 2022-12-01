export default function normalizeAnimeName(name: string) {
  if (name.includes('-')) {
    return name.split(' ').join('_').split('_-').join('').toLowerCase()
  } else {
    return name.split(' ').join('_').toLowerCase()
  }
}
