import multer, { FileFilterCallback } from "multer"
import { resolve} from "path"
import mime from 'mime-types';
import { Request } from "express";

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
      
        cb(null, resolve("./src/uploads"))

    },
    filename(req, file, cb) {

        cb(null, req.params.id + ".jpg")
        
    },

})

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const mimeType = mime.lookup(file.originalname);
    if (mimeType && mimeType.includes('image/')) { 
      
      cb(null, true)
    } else {
      cb(new Error('somente arquivos de imagem'))
    }
};

const upload = multer({ 
  
  storage: storage,  
  fileFilter: fileFilter,
  limits: { fileSize: 1000000 }

});

export default upload;