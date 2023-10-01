import ContentLoader from 'react-content-loader'

export const DateSkeleton = (props: any) => (
  <ContentLoader
    speed={2}
    width={214}
    height={29}
    viewBox="0 0 214 29"
    backgroundColor="#ededed"
    foregroundColor="#f5f5f5"
    {...props}
  >
    <rect x="0" y="0" rx="10" ry="10" width="214" height="29" />
  </ContentLoader>
)
