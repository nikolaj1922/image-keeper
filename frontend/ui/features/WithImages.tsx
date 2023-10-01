import { IImage } from '@mytypes/image'
import { MonthAlbum } from '@ui/components/MonthAlbum'
import { sortImages } from '@utils/sortImages'

interface WithImagesProps {
  images: IImage[]
  handleEditMode: (action: 'active' | 'disable', key: string, label?: string, url?: string) => void
  handleDeleteImage: (key: string) => Promise<void>
  handleDownloadImage: (url: string, originalName: string) => void
}

export const WithImages: React.FC<WithImagesProps> = ({
  images,
  handleEditMode,
  handleDeleteImage,
  handleDownloadImage
}) => {
  return sortImages(images).map(({ year, months }) => {
    return months.map(data => {
      const [month] = Object.keys(data!)

      return (
        <MonthAlbum
          key={data![month][0].key}
          month={month}
          data={data![month]}
          year={year.slice(2)}
          length={data![month].length}
          handleEditMode={handleEditMode}
          handleDeleteImage={handleDeleteImage}
          handleDownloadImage={handleDownloadImage}
        />
      )
    })
  })
}
