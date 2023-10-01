import { Button } from '@ui/components'
import { UploadIcon, LogoIcon } from '@ui/icons'

interface NoImagesProps {
  handleUploadMode: (action: 'active' | 'disable') => void
}

export const NoImages: React.FC<NoImagesProps> = ({ handleUploadMode }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-3 sm:px-0">
      <div className="flex max-w-[400px] flex-col items-center justify-center">
        <div className="mb-[60px]">
          <LogoIcon />
        </div>
        <h1 className="mb-[15px] text-[24px] font-bold text-gray-900 sm:text-[31px]">No images uploaded yet</h1>
        <p className="mb-[15px] text-center text-[15px] text-gray-500">
          Upload your first image by drag and dropping the file on the screen or click the button below
        </p>
        <Button label="Upload Image" onClick={() => handleUploadMode('active')}>
          <UploadIcon />
        </Button>
      </div>
    </div>
  )
}
