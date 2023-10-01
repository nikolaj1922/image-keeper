import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class UploadImageDto {
  @IsString()
  label: string

  @IsString()
  @IsNotEmpty()
  path: string

  @IsNumber()
  @IsNotEmpty()
  key: string

  @IsString()
  @IsNotEmpty()
  originalName: string
}
