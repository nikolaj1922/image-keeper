export interface IImage {
  id?: number
  key: string
  label: string
  url: string
  path: string
  originalName: string
  uploadPercent?: number
  totalSize?: number
  uploadedSize?: number
}

export interface IUploadingImage {
  url: string
  label: string
  file: File
  path: string
  originalName: string
}
