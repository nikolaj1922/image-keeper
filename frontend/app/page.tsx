import React from 'react'
import axiosClient from '@libs/axios'
import HomePage from '../_pages/Home'
import { IImage } from '@mytypes/image'

const page = async () => {
  const dataDB = await axiosClient.get('/images')

  const dataWithBase64String = (await Promise.all(
    dataDB.data.data.map(
      async ({
        id,
        key,
        label,
        path,
        originalName
      }: {
        id: number
        key: string
        label: string
        path: string
        originalName: string
      }) => {
        const [year, month, day] = path?.split('/') as string[]
        const fullNameArray = originalName?.split('.')
        const imageType = fullNameArray[fullNameArray.length - 1]
        const prefix = `data:image/${imageType};base64,`

        const imageBuffer = await axiosClient(`/${year}/${month}/${day}/${key}-${originalName}`, {
          responseType: 'arraybuffer'
        })

        let TYPED_ARRAY = new Uint8Array(imageBuffer.data)
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
          return data + String.fromCharCode(byte)
        }, '')
        let base64String = btoa(STRING_CHAR)

        return {
          id,
          key,
          label,
          path,
          originalName,
          url: `${prefix}${base64String}`
        }
      }
    )
  )) as IImage[]

  return <HomePage data={dataWithBase64String} />
}

export default page
