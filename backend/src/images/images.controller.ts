import { Controller, Get, Patch, Delete, Body, Param, Post, Req, UseInterceptors, UploadedFile } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Request } from 'express'

import { ImageService } from './images.service'
import { UpdateImageDto } from './dtos/update-image'
import { multerConfig } from 'src/multer.config'

@Controller('/images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  async getImages() {
    try {
      const data = await this.imageService.getImages()

      return { status: 'success', data }
    } catch (e) {
      return { status: 'fail', error: e }
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    try {
      const { label, path, key } = req.body

      const image = this.imageService.uploadImage({ label, path, key, originalName: file.originalname })

      return { status: 'success', data: image }
    } catch (e) {
      return { status: 'fail', error: e }
    }
  }

  @Patch('/:key')
  async updateImage(@Param('key') key: string, @Body() body: UpdateImageDto) {
    try {
      const image = await this.imageService.updateImage(key, body)

      return { status: 'success', data: image }
    } catch (e) {
      return { status: 'fail', error: e }
    }
  }

  @Delete('/:key')
  async deleteImage(@Param('key') key: string) {
    try {
      await this.imageService.deleteImage(key)

      return { status: 'success' }
    } catch (e) {
      return { status: 'fail', error: e }
    }
  }
}
