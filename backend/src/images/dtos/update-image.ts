import { IsString } from 'class-validator'

export class UpdateImageDto {
  @IsString()
  label: string
}
