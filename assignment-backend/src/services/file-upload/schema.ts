import multer from "multer";

export const MimeTypes = {
  PNG: "image/png",
  JPG: "image/jpg",
  PDF: "image/pdf",
  JPEG: "image/jpeg",
};

export const multerFileFilterer = (
  file: Express.Multer.File,
  callback: multer.FileFilterCallback,
  fileTypes,
) => {
  const supportedFileTypes = fileTypes;

  if (supportedFileTypes.includes(file.mimetype)) return callback(null, true);

  return callback(
    new Error(
      `We only support ${supportedFileTypes.join(", ")} file types. Found ${file.mimetype}`,
    ),
  );
};
