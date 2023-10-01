'use client'

import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

import axiosClient from '@libs/axios'
import { generateUniqueId } from '../utils/generateUniqId'
import { IImage, IUploadingImage } from '@mytypes/image'
import { LoadingImages, NoImages, WithImages } from '@ui/features'
import { EditImage, Header, UploadImage } from '@ui/shared'

export default function HomePage({ data }: { data: IImage[] }): JSX.Element {
  const [images, setImages] = useState<IImage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [uploadMode, setUploadMode] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const [selectedFiles, setSelectedFiles] = useState<IUploadingImage[]>([])

  const [editedImage, setEditedImage] = useState<null | { key: string; label: string; url: string; path: string }>(null)

  const [isMobile, setIsMobile] = useState(false)

  // Fix NEXT.JS bug: Warning: Prop `id` did not match. Server: "zk7zetr-aria" Client: "plshdqc-aria"
  const [onClient, setOnClient] = useState(false)

  const isHeaderRender = isLoading || !!images?.length

  // MODE
  const handleUploadMode = (action: 'active' | 'disable') => {
    const solution = action === 'active' ? true : false

    if (!solution) {
      setSelectedFiles([])
    }

    setUploadMode(solution)
  }
  const handleEditMode = (action: 'active' | 'disable', key?: string, label?: string, url?: string, path?: string) => {
    if (action === 'active' && key && label && url && path) {
      setEditedImage({ key, label, url, path })
    }

    setEditMode(action === 'active' ? true : false)
  }

  // CUD and Download
  const handleCreateImages = () => {
    handleUploadMode('disable')

    selectedFiles.map(async ({ label, url, file, path, originalName }) => {
      if (!label) {
        const date = path.split('/')
        label = `${date[2]} ${date[1]}`
      }

      const key = generateUniqueId(10)

      setImages(prevState => [{ url, label, key, path, originalName }, ...prevState])

      try {
        const xhr = new XMLHttpRequest()

        xhr.upload.onprogress = e => {
          if (e.lengthComputable) {
            let percent = Math.floor((e.loaded * 100) / e.total)

            setImages(prevState => {
              const targetIndex = prevState.findIndex(item => item.key === key)
              const updatedData = [...prevState]
              updatedData[targetIndex] = {
                ...updatedData[targetIndex],
                uploadPercent: percent,
                totalSize: Math.trunc(e.total / 1000),
                uploadedSize: Math.trunc(e.loaded / 1000)
              }
              return updatedData
            })
          }
        }
        xhr.onload = () => {
          setImages(prevState => {
            const targetIndex = prevState.findIndex(item => item.key === key)
            const updatedData = [...prevState]
            updatedData[targetIndex] = { ...updatedData[targetIndex], uploadPercent: 0 }
            return updatedData
          })

          toast.success('Image successfully uploaded!')
        }
        xhr.open('POST', `${process.env.NEXT_PUBLIC_API_URL}/images`, true)

        const formData = new FormData()
        formData.append('label', label)
        formData.append('path', path)
        formData.append('key', key.toString())
        formData.append('file', file!)

        xhr.send(formData)
      } catch (e) {
        console.log(e)
        toast.error('Something really bad happened while uploading your image, please try again!')
      } finally {
        setSelectedFiles([])
      }
    })
  }
  const handleUpdateImage = async (key: string, label: string, path: string) => {
    const [_, month, day] = path.split('/')
    const correctLabel = label ? label : `${day} ${month}`

    try {
      await axiosClient.patch(`/images/${key}`, {
        label: correctLabel
      })

      setImages(prevState => {
        const editedImageIndex = prevState.findIndex(item => item.key === editedImage?.key)
        const updatedData = [...prevState]
        updatedData[editedImageIndex] = {
          ...updatedData[editedImageIndex],
          label: correctLabel
        }
        return updatedData
      })

      toast.success('Label successfully updated!')
    } catch (e) {
      console.log(e)
      toast.error('Something really bad happened while updating your image label, please try again!')
    } finally {
      setEditMode(false)
    }
  }
  const handleDeleteImage = async (key: string) => {
    try {
      await axiosClient.delete(`/images/${key}`)

      setImages(prevState => prevState.filter(item => item.key !== key))
      toast.success('Image successfully deleted!')
    } catch (e) {
      console.log(e)
      toast.error('Something really bad happened while deleting your image, please try again!')
    } finally {
      setEditMode(false)
    }
  }
  const handleDownloadImage = async (url: string, originalName: string) => {
    const a = document.createElement('a')
    a.href = url
    a.download = originalName
    a.click()
  }

  const mainContent = isLoading ? (
    <LoadingImages isMobile={isMobile} />
  ) : images?.length ? (
    <div className="mb-10 mt-[128px] sm:mt-[178px]">
      <WithImages
        images={images}
        handleEditMode={handleEditMode}
        handleDeleteImage={handleDeleteImage}
        handleDownloadImage={handleDownloadImage}
      />
    </div>
  ) : (
    <NoImages handleUploadMode={handleUploadMode} />
  )

  // Fix NEXT.JS bug: Warning: Prop `id` did not match. Server: "zk7zetr-aria" Client: "plshdqc-aria"
  useEffect(() => {
    setOnClient(true)
  }, [])

  useEffect(() => {
    if (!onClient) return

    setImages(data)
    setIsLoading(false)
  }, [onClient])

  useEffect(() => {
    const checkScreenWidth = () => {
      if (window.innerWidth < 640) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }

    checkScreenWidth()

    window.addEventListener('resize', checkScreenWidth)

    return () => {
      window.removeEventListener('resize', checkScreenWidth)
    }
  }, [])

  return (
    <>
      {onClient && (
        <>
          {' '}
          <Toaster
            position={isMobile ? 'top-center' : 'bottom-right'}
            toastOptions={{
              duration: 4000
            }}
          />
          {isHeaderRender && (
            <Header
              isLoading={isLoading}
              totalImages={images.length}
              isMobile={isMobile}
              handleUploadMode={handleUploadMode}
            />
          )}
          <main>{mainContent}</main>
          {uploadMode && (
            <UploadImage
              selectedFiles={selectedFiles}
              handleUploadMode={handleUploadMode}
              handleCreateImages={handleCreateImages}
              setSelectedFiles={setSelectedFiles}
            />
          )}
          {editMode && (
            <EditImage
              uniqKey={editedImage?.key!}
              label={editedImage?.label!}
              url={editedImage?.url!}
              path={editedImage?.path!}
              isMobile={isMobile}
              handleEditMode={handleEditMode}
              handleUpdateImage={handleUpdateImage}
            />
          )}
        </>
      )}
    </>
  )
}
