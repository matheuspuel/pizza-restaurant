export const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

export const hasEveryWord = (texts: string[], match: string): boolean =>
  normalize(match)
    .split(' ')
    .every(w => texts.some(t => normalize(t).indexOf(w) >= 0))
