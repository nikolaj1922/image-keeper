import { IImage } from '@mytypes/image'

const monthsOrder = [
  'December',
  'November',
  'October',
  'September',
  'August',
  'July',
  'June',
  'May',
  'April',
  'March',
  'February',
  'January'
]

export const sortImages = (images: IImage[]) => {
  const resultObject = {}

  images.forEach(item => {
    const [year, month] = item.path.split('/')
    if (!resultObject[year]) resultObject[year] = {}
    if (!resultObject[year][month]) resultObject[year][month] = []
    resultObject[year][month].push(item)
  })

  const sortedYears = Object.keys(resultObject).sort((a, b) => +b - +a)

  const sortedImages = sortedYears.map(year => {
    const months = monthsOrder
      .filter(month => resultObject[year][month] !== undefined)
      .map(month => {
        if (resultObject[year][month]) {
          return {
            [month]: resultObject[year][month]
          }
        }
      })

    return {
      year,
      months
    }
  })

  return sortedImages
}
