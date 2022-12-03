import multer from "multer";
import { v4 } from "uuid";
import { MimeTypes, multerFileFilterer } from "./schema";
import { mime } from "serve-static";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${v4()}.${mime.extension(file.mimetype)}`);
  },
});

const fileLimit = { fileSize: 2 * 1024 * 1024 };

const upload = (limits = fileLimit, mimeTypes = Object.values(MimeTypes)) => {
  return multer({
    storage,
    limits,
    fileFilter: (req, file, cb) => multerFileFilterer(file, cb, mimeTypes),
  });
};

export default upload;
