import { useEffect, useState } from 'react'

import { Button } from '@ui/components'
import { UploadIcon, LogoIcon } from '@ui/icons'
import { UnderLogoInfoSkeleton } from '@ui/skeletons'

interface HeaderProps {
  handleUploadMode: (action: 'active' | 'disable') => void
  isLoading: boolean
  totalImages: number
  isMobile: boolean
}

export const Header = ({ isLoading, handleUploadMode, totalImages, isMobile }: HeaderProps): React.JSX.Element => {
  return (
    <header className="header">
      <div className="flex flex-col items-start space-y-[13px]">
        <LogoIcon />
        {isLoading ? (
          <UnderLogoInfoSkeleton />
        ) : (
          <p className="text-[12.5px] font-normal leading-[15.6px]">
            {totalImages} image{totalImages > 1 ? 's' : ''} stored in keeper
          </p>
        )}
      </div>
      <Button label={isMobile ? '' : 'Upload image'} isLoading={isLoading} onClick={() => handleUploadMode('active')}>
        <UploadIcon isLoading={isLoading} />
      </Button>
    </header>
  )
}
