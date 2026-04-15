import multer from "multer";
import { NextFunction, Request, Response } from "express";
import { errorMessage } from "../helpers/messages";
import { errorResponse } from "../helpers/responses";

const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(errorMessage.invalid_format || "Formato de imagen no válido"));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, 
});


export const uploadImage = (fieldName: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        upload.single(fieldName)(req, res, (error) => {
            if (error instanceof multer.MulterError) {
                const message = error.code === 'LIMIT_FILE_SIZE'
                    ? "El archivo debe pesar menos de 5MB" 
                    : "Error al subir el archivo";
                return errorResponse(res, message, 400);
            }
            if (error) {

                return errorResponse(res, error.message, 400);
            }
            next();
        });
    }
};
