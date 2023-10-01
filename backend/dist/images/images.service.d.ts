import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateImageDto } from './dtos/update-image';
import { UploadImageDto } from './dtos/upload-image';
export declare class ImageService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getImages(): Promise<{
        key: string;
        label: string;
        path: string;
        id: number;
        originalName: string;
    }[]>;
    uploadImage({ label, path, key, originalName }: UploadImageDto): Promise<{
        id: number;
        key: string;
        label: string;
        path: string;
        originalName: string;
        created_at: Date;
        updated_at: Date;
    }>;
    updateImage(key: string, { label }: UpdateImageDto): Promise<{
        id: number;
        key: string;
        label: string;
        path: string;
        originalName: string;
        created_at: Date;
        updated_at: Date;
    }>;
    deleteImage(key: string): Promise<void>;
    downloadImage(key: string): Promise<{
        id: number;
        key: string;
        label: string;
        path: string;
        originalName: string;
        created_at: Date;
        updated_at: Date;
    }>;
}
