import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

import { Button, ImageCard } from '@ui/components'
import { CloseIcon, AcceptIcon, BigUploadIcon } from '@ui/icons'
import { IUploadingImage } from '@mytypes/image'
import { createDate } from '../../utils/createDate'

interface UploadImageProps {
  handleUploadMode: (action: 'active' | 'disable') => void
  selectedFiles: IUploadingImage[]
  setSelectedFiles: Dispatch<SetStateAction<IUploadingImage[]>>
  handleCreateImages: () => void
}

export const UploadImage: React.FC<UploadImageProps> = ({
  handleUploadMode,
  selectedFiles,
  setSelectedFiles,
  handleCreateImages
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    const files = e.dataTransfer.files

    if (!files || files.length === 0) return

    const newFiles = Array.from(files)

    newFiles.map(file => {
      const reader = new FileReader()

      reader.onload = readerEvent => {
        const dataURL = readerEvent.target?.result as string
        const { day, month, year } = createDate()

        setSelectedFiles(prevState => [
          ...prevState,
          { url: dataURL, label: '', file, path: `${year}/${month}/${day}`, originalName: file.name }
        ])
      }

      reader.readAsDataURL(file)
      return reader
    })
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (!files || files.length === 0) return

    const newFiles = Array.from(files)

    newFiles.map(file => {
      const reader = new FileReader()

      reader.onload = readerEvent => {
        const dataURL = readerEvent.target?.result as string
        const { day, month, year } = createDate()

        setSelectedFiles(prevState => [
          ...prevState,
          { url: dataURL, label: '', file, path: `${year}/${month}/${day}`, originalName: file.name }
        ])
      }

      reader.readAsDataURL(file)
      return reader
    })
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className="fixed left-0 top-0 z-100 h-screen w-screen bg-white/80 backdrop-blur-sm">
      <input
        type="file"
        accept="image/*"
        className="opacity-0"
        ref={inputRef}
        multiple
        onChange={e => handleFileSelect(e)}
      />
      {selectedFiles.length ? (
        <div
          className="absolute left-1/2 top-1/2 z-130 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center"
          onDragOver={e => handleDragOver(e)}
          onDrop={e => handleFileDrop(e)}
        >
          <h2 className="mb-10 text-center text-[25px] font-semibold text-gray-900">Set custom label</h2>
          <div className="mb-6 flex max-w-[350px] items-center justify-start gap-[20px] overflow-x-scroll px-1  pb-4 scrollbar-thin scrollbar-thumb-[#3D293F] sm:max-w-[1400px] sm:gap-[15px] sm:px-0">
            {selectedFiles.map((file, index) => (
              <ImageCard
                url={file.url}
                key={index}
                index={index}
                setSelectedFiles={setSelectedFiles}
                selectedFiles={selectedFiles}
              />
            ))}
          </div>
          <Button label="Save" className="w-[103px]" onClick={handleCreateImages}>
            <AcceptIcon />
          </Button>
        </div>
      ) : (
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[15px]">
          <BigUploadIcon />
          <h1 className="text-[31px] font-bold text-gray-900">Upload file</h1>
          <p className="text-center text-[15px] text-gray-500">Drop your file here to start uploading</p>
        </div>
      )}
      <div
        className="absolute z-120 h-screen w-screen opacity-0"
        onDragOver={handleDragOver}
        onDrop={e => handleFileDrop(e)}
        onClick={() => inputRef.current?.click()}
      />

      <Button
        className="absolute right-[25px] top-[25px] z-130 sm:right-[50px] sm:top-[50px]"
        onClick={() => {
          handleUploadMode('disable')
          setSelectedFiles([])
        }}
      >
        <CloseIcon />
      </Button>
    </div>
  )
}
