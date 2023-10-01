import { useEffect, useState } from 'react'

import { Button, ImageCard } from '@ui/components'
import { CloseIcon, AcceptIcon } from '@ui/icons'

interface EditImageProps {
  handleEditMode: (action: 'active' | 'disable', key?: string, label?: string, url?: string, path?: string) => void
  handleUpdateImage: (key: string, label: string, path: string) => void
  url: string
  label: string
  uniqKey: string
  path: string
  isMobile: boolean
}

export const EditImage: React.FC<EditImageProps> = ({
  url,
  path,
  label,
  uniqKey,
  isMobile,
  handleEditMode,
  handleUpdateImage
}) => {
  const [newLabel, setNewLabel] = useState<string>(label)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className="fixed left-1/2 top-1/2 z-100 flex h-screen w-screen -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
      <h2 className="mb-10 text-center text-[25px] font-semibold text-gray-900">Set custom label</h2>
      <ImageCard url={url} newLabel={newLabel} setNewLabel={setNewLabel} />
      <Button
        label="Save"
        className="mt-6 w-[103px] sm:mt-10"
        onClick={() => handleUpdateImage(uniqKey, newLabel, path)}
      >
        <AcceptIcon />
      </Button>
      <Button
        className="absolute right-[25px] top-[25px] z-100 sm:right-[50px] sm:top-[50px]"
        label={isMobile ? '' : 'Close editor'}
        onClick={() => handleEditMode('disable')}
      >
        <CloseIcon />
      </Button>
    </div>
  )
}
