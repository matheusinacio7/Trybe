import { promises as fs } from 'fs';
import path from 'path';
import type { Handler } from 'express';
import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import type { PutObjectCommandOutput } from '@aws-sdk/client-s3';

const upload = multer({
  limits: {
    fileSize: 5000000,
  },
});

const parseFiles = upload.fields([
  { name: 'file', maxCount: 2 },
  { name: 'file2', maxCount: 1 },
]);

const handleFileSystem : Handler = async (req, res, next) => {
  try {
    if (req.files) {
      const saveFiles : Promise<void>[] = [];

      Object.entries(req.files).forEach(([fieldName, fileArray] : [fieldName: string, fileArray: Express.Multer.File[]]) => {
        fileArray.forEach((file) => {
          const dirPath = path.resolve('upload', res.locals.username, fieldName);
          const createDir = () => fs.mkdir(dirPath, { recursive: true });
          const filePath = path.resolve(dirPath, file.originalname);
          const saveFile = () => fs.writeFile(filePath, file.buffer);
          saveFiles.push(new Promise(async (resolve) => {
            await createDir();
            await saveFile();
            resolve();
          }));
        });
      });
  
      await Promise.all(saveFiles);
    }
  } catch (err) {
    return next(err);
  }

  next();
}; 

const REGION = 'sa-east-1';
const BUCKET = 'heysettrybe';

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_KEY as string,
  },
});


const handleCloudStorage : Handler = async (req, res, next) => {
  if (!req.files) {
    return next();
  }

  try {
    const saveFiles : Promise<PutObjectCommandOutput>[] = [];

    Object.entries(req.files).forEach(([fieldName, fileArray] : [fieldName: string, fileArray: Express.Multer.File[]]) => {
      fileArray.forEach((file) => {
        const fileKey = `${res.locals.username}-${fieldName}-${file.originalname}`;

        saveFiles.push(s3Client.send(new PutObjectCommand({
          Bucket: BUCKET,
          Key: fileKey,
          Body: file.buffer,
          ContentType: file.mimetype,
        })));
      });
    });

    await Promise.all(saveFiles);
  } catch (err) {
    return next(err);
  }

  next();
}

const handleFileUpload  = {
  fileSystem: [parseFiles, handleFileSystem],
  cloudStorage: [parseFiles, handleCloudStorage],
};

export default handleFileUpload;
