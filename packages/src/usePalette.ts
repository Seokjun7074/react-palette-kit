import { useEffect } from 'react';

export interface PaletteProps {
  src: string;
}

export const usePalette = ({ src }: PaletteProps) => {
  useEffect(() => {
    if (!src) return;

    getPalette(src);
  }, [src]);
};

const getPalette = async (src: string) => {
  const ctx = await createCanvasContext(src);
};

const createCanvasContext = async (
  src: string,
): Promise<CanvasRenderingContext2D> => {
  const img = new Image();
  img.src = src;

  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
  });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D context is not available');

  const { newWidth, newHeight } = getResizedImageSize(img);
  canvas.width = newWidth;
  canvas.height = newHeight;
  ctx.drawImage(img, 0, 0, newWidth, newHeight);

  return ctx;
};

const getResizedImageSize = (img: HTMLImageElement) => {
  const maxWidth = 500;
  const maxHeight = 500;
  // 원본 비율 계산
  const ratio = img.width / img.height;
  // 새 크기 계산
  let newWidth = img.width;
  let newHeight = img.height;

  if (img.width > maxWidth) {
    newWidth = maxWidth;
    newHeight = Math.round(maxWidth / ratio);
  }
  if (newHeight > maxHeight) {
    newHeight = maxHeight;
    newWidth = Math.round(maxHeight * ratio);
  }

  return { newWidth, newHeight };
};
