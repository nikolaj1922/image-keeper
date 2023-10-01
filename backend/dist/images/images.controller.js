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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const images_service_1 = require("./images.service");
const update_image_1 = require("./dtos/update-image");
const multer_config_1 = require("../multer.config");
let ImageController = class ImageController {
    constructor(imageService) {
        this.imageService = imageService;
    }
    async getImages() {
        try {
            const data = await this.imageService.getImages();
            return { status: 'success', data };
        }
        catch (e) {
            return { status: 'fail', error: e };
        }
    }
    async uploadImage(file, req) {
        try {
            const { label, path, key } = req.body;
            const image = this.imageService.uploadImage({ label, path, key, originalName: file.originalname });
            return { status: 'success', data: image };
        }
        catch (e) {
            return { status: 'fail', error: e };
        }
    }
    async updateImage(key, body) {
        try {
            const image = await this.imageService.updateImage(key, body);
            return { status: 'success', data: image };
        }
        catch (e) {
            return { status: 'fail', error: e };
        }
    }
    async deleteImage(key) {
        try {
            await this.imageService.deleteImage(key);
            return { status: 'success' };
        }
        catch (e) {
            return { status: 'fail', error: e };
        }
    }
};
exports.ImageController = ImageController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "getImages", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', multer_config_1.multerConfig)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Patch)('/:key'),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_image_1.UpdateImageDto]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "updateImage", null);
__decorate([
    (0, common_1.Delete)('/:key'),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "deleteImage", null);
exports.ImageController = ImageController = __decorate([
    (0, common_1.Controller)('/images'),
    __metadata("design:paramtypes", [images_service_1.ImageService])
], ImageController);
//# sourceMappingURL=images.controller.js.map