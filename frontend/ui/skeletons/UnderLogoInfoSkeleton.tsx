import ContentLoader from 'react-content-loader'

export const UnderLogoInfoSkeleton = () => (
  <ContentLoader
    speed={2}
    width={138}
    height={15}
    viewBox="0 0 138 15"
    backgroundColor="#ededed"
    foregroundColor="#f5f5f5"
  >
    <rect x="0" y="0" rx="10" ry="10" width="138" height="15" />
  </ContentLoader>
)
