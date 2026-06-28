import React, { useEffect, useState } from "react";

export default function ShoeAssetImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  fallback,
}) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  return (
    <div className={className}>
      {hasError ? (
        fallback
      ) : (
        <img
          src={src}
          alt={alt}
          className={imgClassName}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}