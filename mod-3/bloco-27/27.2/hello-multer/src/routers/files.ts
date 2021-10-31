import { promises as fs } from 'fs';
import path from 'path';
import { Router } from 'express';
import type { Handler } from 'express';
import multer from 'multer';

import { validateToken } from '@middlewares';

const router = Router();

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
    next(err);
  }

  next();
}; 

const handleFileUpload : Handler[] = [
  parseFiles,
  handleFileSystem,  
];

// Should not have to spread
// see: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/51337
router.post('/', validateToken, ...handleFileUpload, async (req, res, next) => {
  res.status(200).end();
});

export default router;
