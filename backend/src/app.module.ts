import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/prisma.module'
import { ImagesModule } from './images/images.module'
import { MulterModule } from '@nestjs/platform-express/multer'
import { multerConfig } from './multer.config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    PrismaModule,
    ImagesModule,
    MulterModule.register(multerConfig),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files')
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
