import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import cloudinary from "../config/cloudinary.config";
import { ImageUploadResult } from "../types/interfaces";

export const uploadToCloudinary= async (fileBuffer: Buffer, folder: string): Promise<ImageUploadResult> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { 
                folder: `vaquita/${folder}`,
                resource_type: 'image'
            },
            (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                if (error) return reject(error);
                if (!result) return reject(new Error("Error al obtener respuesta de Cloudinary"));
                
                resolve({
                    url: result.secure_url,
                    publicId: result.public_id
                });
            }
        );

        uploadStream.end(fileBuffer);
    });
};

export const deleteFromCloudinary = async (publicId: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
    });
};