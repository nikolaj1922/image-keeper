/// <reference types="multer" />
import { Request } from 'express';
import { ImageService } from './images.service';
import { UpdateImageDto } from './dtos/update-image';
export declare class ImageController {
    private readonly imageService;
    constructor(imageService: ImageService);
    getImages(): Promise<{
        status: string;
        data: {
            key: string;
            label: string;
            path: string;
            id: number;
            originalName: string;
        }[];
        error?: undefined;
    } | {
        status: string;
        error: any;
        data?: undefined;
    }>;
    uploadImage(file: Express.Multer.File, req: Request): Promise<{
        status: string;
        data: Promise<{
            id: number;
            key: string;
            label: string;
            path: string;
            originalName: string;
            created_at: Date;
            updated_at: Date;
        }>;
        error?: undefined;
    } | {
        status: string;
        error: any;
        data?: undefined;
    }>;
    updateImage(key: string, body: UpdateImageDto): Promise<{
        status: string;
        data: {
            id: number;
            key: string;
            label: string;
            path: string;
            originalName: string;
            created_at: Date;
            updated_at: Date;
        };
        error?: undefined;
    } | {
        status: string;
        error: any;
        data?: undefined;
    }>;
    deleteImage(key: string): Promise<{
        status: string;
        error?: undefined;
    } | {
        status: string;
        error: any;
    }>;
}
