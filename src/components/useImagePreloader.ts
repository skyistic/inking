import { useState, useEffect } from 'react';

interface ImagePreloadResult {
  imagesLoaded: boolean;
  progress: number;
  loadedImages: string[];
  failedImages: string[];
}

export const useImagePreloader = (imageUrls: string[]): ImagePreloadResult => {
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    if (imageUrls.length === 0) {
      setImagesLoaded(true);
      return;
    }

    let loadedCount = 0;
    let failedCount = 0;

    const preloadImage = (url: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        
        img.onload = () => {
          resolve(url);
        };
        
        img.onerror = () => {
          reject(url);
        };
        
        img.src = url;
      });
    };

    const preloadAllImages = async () => {
      const promises = imageUrls.map(url => 
        preloadImage(url)
          .then(loadedUrl => {
            setLoadedImages(prev => [...prev, loadedUrl]);
            loadedCount++;
            return { status: 'loaded', url: loadedUrl };
          })
          .catch(failedUrl => {
            setFailedImages(prev => [...prev, failedUrl]);
            failedCount++;
            return { status: 'failed', url: failedUrl };
          })
      );

      await Promise.allSettled(promises);
      setImagesLoaded(true);
    };

    preloadAllImages();
  }, [imageUrls]);

  const progress = imageUrls.length > 0 
    ? ((loadedImages.length + failedImages.length) / imageUrls.length) * 100 
    : 100;

  return {
    imagesLoaded,
    progress,
    loadedImages,
    failedImages,
  };
}; 