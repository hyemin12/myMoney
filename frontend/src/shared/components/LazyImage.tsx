import { useState } from 'react';

import Loading from './Loading';

interface Props {
  src: string;
  alt: string;
}
function LazyImage({ src, alt }: Props) {
  const [loadImage, setLoadImage] = useState(true);

  return (
    <>
      {loadImage && <Loading />}
      <img
        loading="lazy"
        src={src}
        alt={alt}
        onLoad={() => setLoadImage(false)}
      />
    </>
  );
}

export default LazyImage;
