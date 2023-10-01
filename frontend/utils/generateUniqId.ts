export function generateUniqueId(length: number) {
  let result = ''
  const characters = '0123456789AaBbCcDdEe'
  const charactersLength = characters.length

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength)
    result += characters.charAt(randomIndex)
  }

  return result
}
