import { IUploadingImage } from '@mytypes/image'

interface ImageCardProps {
  url: string
  newLabel?: string
  setNewLabel?: React.Dispatch<React.SetStateAction<string>>
  index?: number
  setSelectedFiles?: React.Dispatch<React.SetStateAction<IUploadingImage[]>>
  selectedFiles?: IUploadingImage[]
}

export const ImageCard = ({ url, index, setSelectedFiles, selectedFiles, newLabel, setNewLabel }: ImageCardProps) => {
  const mode = selectedFiles || setSelectedFiles ? 'upload' : 'edit'

  return (
    <div className="flex w-[335px] flex-col items-center justify-center">
      <div className="flex w-[335px] flex-col items-center justify-center gap-5 sm:h-[282px]">
        <img src={url} alt="image" className="w-[335px] rounded-[10px] sm:h-[200px] sm:w-auto" draggable={false} />
        <div className="flex flex-col items-center justify-center gap-[10px]">
          <input
            type="text"
            className="max-w-[335px] bg-transparent text-center text-[18px] font-normal text-[#3D293F] outline-none placeholder:text-gray-500"
            placeholder="Enter custom label"
            maxLength={100}
            value={mode === 'upload' ? selectedFiles![index!].label : newLabel}
            onChange={e => {
              if (mode === 'upload') {
                const updatedFiles = [...selectedFiles!]
                updatedFiles[index!].label = e.target.value
                setSelectedFiles!(updatedFiles)
              } else {
                setNewLabel!(e.target.value)
              }
            }}
          />
          <span className="text-center text-[12.5px] text-gray-500">100 chars max</span>
        </div>
      </div>
    </div>
  )
}
