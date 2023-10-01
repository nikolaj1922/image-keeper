"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfig = void 0;
const fs = require('fs');
const multer_1 = require("multer");
exports.multerConfig = {
    storage: (0, multer_1.diskStorage)({
        destination: (req, file, cb) => {
            const { path } = req.body;
            const [year, month, day] = path.split('/');
            if (!fs.existsSync(`./files`))
                fs.mkdirSync(`./files`);
            if (!fs.existsSync(`./files/${year}`))
                fs.mkdirSync(`./files/${year}`);
            if (!fs.existsSync(`./files/${year}/${month}`))
                fs.mkdirSync(`./files/${year}/${month}`);
            if (!fs.existsSync(`./files/${year}/${month}/${day}`))
                fs.mkdirSync(`./files/${year}/${month}/${day}`);
            cb(null, `./files/${year}/${month}/${day}`);
        },
        filename: (req, file, cb) => {
            const { key } = req.body;
            cb(null, `${key}-${file.originalname}`);
        }
    })
};
//# sourceMappingURL=multer.config.js.map