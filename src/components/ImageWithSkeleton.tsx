import React, { useState } from 'react';

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  onImageLoad?: () => void;
}

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = 'relative overflow-hidden bg-stone-200 dark:bg-stone-850',
  referrerPolicy = 'no-referrer',
  loading = 'lazy',
  decoding = 'async',
  onImageLoad,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`img-loading-placeholder ${containerClassName}`}>
      {/* Skeleton Shimmer Background overlay while image is downloading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 skeleton-shimmer z-10" />
      )}

      {/* Fallback Error View if image URL fails */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-300 dark:bg-stone-800 text-stone-500 text-xs p-2 text-center">
          <span className="font-serif italic font-medium">{alt || 'Imagem indisponível'}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding={decoding}
          referrerPolicy={referrerPolicy}
          onLoad={() => {
            setIsLoaded(true);
            if (onImageLoad) onImageLoad();
          }}
          onError={() => {
            setHasError(true);
            setIsLoaded(true);
          }}
          className={`img-smooth ${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
};
