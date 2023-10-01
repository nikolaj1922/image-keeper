import { MyImage, Date } from '@ui/components'
import { IImage } from '@mytypes/image'

interface WithImagesProps {
  data: IImage[]
  handleEditMode: (action: 'active' | 'disable', key: string, label?: string, url?: string) => void
  handleDeleteImage: (key: string) => Promise<void>
  handleDownloadImage: (url: string, originalName: string) => void
  length: number
  year: string
  month: string
}

export const MonthAlbum: React.FC<WithImagesProps> = ({
  data,
  handleEditMode,
  handleDeleteImage,
  handleDownloadImage,
  length,
  year,
  month
}): React.JSX.Element => {
  return (
    <section className="mt-[53px] min-h-full sm:px-[50px]">
      <Date count={length} year={year} month={month} />
      <div className="flex flex-col flex-wrap items-center justify-center gap-[15px] sm:flex-row sm:justify-start">
        {data.map(({ label, uploadPercent, key, url, totalSize, uploadedSize, path, originalName }) => {
          return (
            <MyImage
              key={key}
              url={url}
              label={label}
              uniqKey={key}
              path={path}
              originalName={originalName}
              uploadedSize={uploadedSize}
              totalSize={totalSize}
              uploadPercent={uploadPercent}
              handleEditMode={handleEditMode}
              handleDeleteImage={handleDeleteImage}
              handleDownloadImage={handleDownloadImage}
            />
          )
        })}
      </div>
    </section>
  )
}
