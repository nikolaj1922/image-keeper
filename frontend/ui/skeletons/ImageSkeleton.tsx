import ContentLoader from 'react-content-loader'

interface Skeleton {
  width: string | number | undefined
}

export const ImageSkeleton: React.FC<Skeleton> = ({ width }) => (
  <ContentLoader
    speed={2}
    width={width}
    height={200}
    viewBox={`0 0 ${width} 200`}
    backgroundColor="#ededed"
    foregroundColor="#f5f5f5"
  >
    <rect x="0" y="0" rx="10" ry="10" width={width} height="200" />
  </ContentLoader>
)
