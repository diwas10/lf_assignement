import { Crop } from 'react-image-crop';

export const getCroppedImg = (image: HTMLImageElement, crop: Crop, fileName: string) => {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d')!;

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );
  try {
    // As a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob((file: any) => {
        file.name = fileName;
        resolve(file);
      }, 'image/jpeg');
    }) as Promise<File>;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// export function getCroppedImg(imageFile: File, pixelCrop: Crop, fileName: string) {
//   const canvas = document.createElement('canvas');
//   canvas.width = pixelCrop.width;
//   canvas.height = pixelCrop.height;
//   const ctx = canvas.getContext('2d')!;
//
//   const image = new Image();
//   image.src = URL.createObjectURL(imageFile);
//
//   ctx.drawImage(
//     image,
//     pixelCrop.x,
//     pixelCrop.y,
//     pixelCrop.width,
//     pixelCrop.height,
//     0,
//     0,
//     pixelCrop.width,
//     pixelCrop.height
//   );
//
//   document.getElementById('modalHEaderrer')?.append(canvas);
//   debugger;
//
//   // As Base64 string
//   const base64Image = canvas.toDataURL('image/jpeg');
//
//   console.log(base64Image);
//
//   // As a blob
//   // return new Promise((resolve, reject) => {
//   //   canvas.toBlob((file: any) => {
//   //     file.name = fileName;
//   //     resolve(file);
//   //   }, 'image/jpeg');
//   // }) as Promise<File>;
//
//   return dataUrlToBlob(base64Image);
// }

export function dataUrlToBlob(strUrl: string) {
  let parts = strUrl.split(/[:;,]/),
    type = parts[1],
    decoder = parts[2] == 'base64' ? atob : decodeURIComponent,
    binData = decoder(parts.pop()!),
    mx = binData.length,
    i = 0,
    uiArr = new Uint8Array(mx);
  for (i; i < mx; ++i) uiArr[i] = binData.charCodeAt(i);
  return new Blob([uiArr], { type: type });
}
