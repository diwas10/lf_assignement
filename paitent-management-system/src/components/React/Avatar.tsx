import React from 'react';
import PlaceholderImage from '../../assets/image/avatar.png';
import { getServerImage } from '../../utility/utility';

interface Props
  extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  path: string;
}

const Avatar: FunctionComponent<Props> = ({ path, ...props }) => {
  return (
    <img
      {...props}
      src={getServerImage(path)}
      onError={(e) => (e.currentTarget.src = PlaceholderImage)}
    />
  );
};

export default Avatar;
