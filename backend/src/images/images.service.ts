const fs = require('fs')

import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateImageDto } from './dtos/update-image'
import { UploadImageDto } from './dtos/upload-image'

@Injectable()
export class ImageService {
  constructor(private readonly prismaService: PrismaService) {}

  async getImages() {
    const dataFromDB = (await this.prismaService.image.findMany({
      select: {
        key: true,
        label: true,
        path: true,
        id: true,
        originalName: true
      },
      orderBy: {
        created_at: 'desc'
      }
    })) as {
      key: string
      label: string
      path: string
      id: number
      originalName: string
    }[]

    return dataFromDB
  }

  async uploadImage({ label, path, key, originalName }: UploadImageDto) {
    const image = await this.prismaService.image.create({
      data: {
        label,
        path,
        key,
        originalName
      }
    })

    return image
  }

  async updateImage(key: string, { label }: UpdateImageDto) {
    const image = await this.prismaService.image.update({
      where: {
        key
      },
      data: {
        label
      }
    })

    return image
  }

  async deleteImage(key: string) {
    const image = await this.prismaService.image.findUnique({
      where: {
        key
      }
    })

    fs.unlink(`./files/${image.path}/${key}-${image.originalName}`, err => {
      if (err) {
        throw new HttpException(err, HttpStatus.BAD_REQUEST)
      }
    })

    await this.prismaService.image.delete({
      where: {
        key
      }
    })
  }

  async downloadImage(key: string) {
    const image = await this.prismaService.image.findUnique({
      where: {
        key
      }
    })

    return image
  }
}
