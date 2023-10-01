import { DateSkeleton, ImageSkeleton } from '@ui/skeletons'
import { imageLoadersWidthDesktop, imageLoadersWidthMobile } from '@constants/imageLoadersWidth'

export const LoadingImages = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <div className="mb-10 mt-[128px] min-h-full px-[25px] sm:mb-0 sm:mt-[178px] sm:px-[50px]">
      <DateSkeleton className="mb-5" />
      <div className="flex flex-col items-center justify-center gap-[15px] sm:flex-row sm:justify-start">
        {isMobile
          ? imageLoadersWidthMobile.map((width, index) => <ImageSkeleton width={width} key={index} />)
          : imageLoadersWidthDesktop.map((width, index) => <ImageSkeleton width={width} key={index} />)}
      </div>
    </div>
  )
}
