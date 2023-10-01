import { Module } from '@nestjs/common'
import { ImageService } from './images.service'
import { ImageController } from './images.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [ImageService],
  controllers: [ImageController]
})
export class ImagesModule {}
