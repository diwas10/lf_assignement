import React from 'react';
import ReactCrop, { ReactCropProps } from 'react-image-crop';

interface Props extends ReactCropProps {}

const CropImage: FunctionComponent<Props> = (props) => {
  return <ReactCrop {...props}>{props.children}</ReactCrop>;
};

export default CropImage;
