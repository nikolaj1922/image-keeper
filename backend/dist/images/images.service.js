"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const fs = require('fs');
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ImageService = class ImageService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
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
        }));
        return dataFromDB;
    }
    async uploadImage({ label, path, key, originalName }) {
        const image = await this.prismaService.image.create({
            data: {
                label,
                path,
                key,
                originalName
            }
        });
        return image;
    }
    async updateImage(key, { label }) {
        const image = await this.prismaService.image.update({
            where: {
                key
            },
            data: {
                label
            }
        });
        return image;
    }
    async deleteImage(key) {
        const image = await this.prismaService.image.findUnique({
            where: {
                key
            }
        });
        fs.unlink(`./files/${image.path}/${key}-${image.originalName}`, err => {
            if (err) {
                throw new common_1.HttpException(err, common_1.HttpStatus.BAD_REQUEST);
            }
        });
        await this.prismaService.image.delete({
            where: {
                key
            }
        });
    }
    async downloadImage(key) {
        const image = await this.prismaService.image.findUnique({
            where: {
                key
            }
        });
        return image;
    }
};
exports.ImageService = ImageService;
exports.ImageService = ImageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ImageService);
//# sourceMappingURL=images.service.js.map