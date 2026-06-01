/**
 * Image Optimization Best Practices
 * 
 * For LCP (Largest Contentful Paint) images:
 * - Use priority={true}
 * - Use fetchPriority="high"
 * - Use placeholder="blur" for LQIP
 * - Preload the image
 * 
 * For below-the-fold images:
 * - Use loading="lazy"
 * - Don't use priority
 * - Consider using placeholder for better UX
 * 
 * For all images:
 * - Use next/image component
 * - Specify width and height
 * - Use appropriate sizes prop
 * - Optimize formats (WebP, AVIF)
 */

export const ImageOptimizationGuide = {
  // LCP Image (Hero/Cover)
  lcpImage: {
    priority: true,
    fetchPriority: 'high',
    placeholder: 'blur',
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px',
  },

  // Article/Content Images
  contentImage: {
    loading: 'lazy',
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px',
  },

  // Thumbnail Images
  thumbnail: {
    loading: 'lazy',
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px',
  },

  // Small Icons
  icon: {
    loading: 'lazy',
    sizes: '40px',
  },
};

/**
 * Generate placeholder data URLs for blur effect
 * Can be pre-generated during build time
 */
export const generateBlurDataURL = (width: number, height: number): string => {
  const canvas = typeof window !== 'undefined' ? document.createElement('canvas') : null;
  if (!canvas) return '';

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Create a light gray placeholder
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL();
};
