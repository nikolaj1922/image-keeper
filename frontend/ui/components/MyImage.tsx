import { useState } from 'react'

import { SecondaryButton } from '@ui/components'
import { DownloadIcon, EditIcon, DeleteIcon } from '@ui/icons'

interface MyImageProps {
  url: string
  label: string
  uniqKey: string
  originalName: string
  handleEditMode: (action: 'active' | 'disable', key: string, label?: string, url?: string, path?: string) => void
  handleDownloadImage: (url: string, originalName: string) => void
  handleDeleteImage: (key: string) => Promise<void>
  uploadPercent?: number
  totalSize?: number
  uploadedSize?: number
  path: string
}

export const MyImage: React.FC<MyImageProps> = ({
  handleEditMode,
  handleDeleteImage,
  handleDownloadImage,
  url,
  label,
  uniqKey,
  uploadPercent = 0,
  totalSize = 0,
  uploadedSize = 0,
  originalName,
  path
}) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="relative max-w-[335px] pt-[15px]">
      {uploadPercent > 0 && (
        <>
          <div
            className={`absolute left-0 top-0 z-40 mt-[15px] h-full rounded-[10px] bg-white/60 transition-all duration-100`}
            style={{
              width: `${uploadPercent}%`
            }}
          />
          <div className={`absolute  left-0 top-0  z-40 mt-[15px] h-[200px] w-full rounded-[10px] bg-transparent`} />
          <div className="absolute left-1/2 top-1/2  z-50 mt-[15px] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center ">
            <span className="text-[21px] font-semibold text-gray-900">Uploading</span>
            <span className="text-[12.5px] font-normal text-gray-500">
              {uploadedSize}kb of {totalSize}kb
            </span>
          </div>
        </>
      )}

      <img
        src={url}
        alt="image"
        className="w-full rounded-[10px] sm:h-[200px] sm:max-w-[335px]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />

      <div
        className={`absolute bottom-4 left-4 flex flex-col items-start justify-center gap-[15px] transition-all duration-150 ${
          hovered ? 'opacity-100' : 'opacity-0'
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <SecondaryButton label="Download" onClick={() => handleDownloadImage(url, originalName)}>
          <DownloadIcon />
        </SecondaryButton>
        <SecondaryButton label="Edit label" onClick={() => handleEditMode('active', uniqKey, label, url, path)}>
          <EditIcon />
        </SecondaryButton>
        <SecondaryButton label="Delete" onClick={() => handleDeleteImage(uniqKey)}>
          <DeleteIcon />
        </SecondaryButton>
      </div>
      <span className="absolute right-2.5 top-0 z-50 max-w-[170px] overflow-hidden text-ellipsis break-words rounded-[5px] bg-[#FCF6B1] p-2 text-xl text-[#393E46] sm:max-w-[100px] sm:p-[5px] sm:text-[12.5px] ">
        {label}
      </span>
    </div>
  )
}
