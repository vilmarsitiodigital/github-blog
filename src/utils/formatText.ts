export function formatText(text: string, limitLength = 50) {
  if (text.trim().length <= 0) {
    return text
  }
  const textArr = text.split(' ')
  const newText = textArr
    .map((string, index) => {
      return index < limitLength ? string : ''
    })
    .filter((string) => string !== undefined)
  return `${newText.toString().replaceAll(',', ' ')}...`
}
