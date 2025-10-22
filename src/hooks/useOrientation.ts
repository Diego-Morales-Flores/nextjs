import { useState, useEffect } from 'react';

export const useOrientation = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [orientation, setOrientation] = useState<{
    isPortrait: boolean;
    isLandscape: boolean;
    width: number;
    height: number;
  }>(() => {
    // Durante SSR, usar valores por defecto para evitar hidratación mismatch
    if (typeof window === 'undefined') {
      return {
        isPortrait: true,
        isLandscape: false,
        width: 0,
        height: 0,
      };
    }
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    return {
      isPortrait: height > width,
      isLandscape: width > height,
      width,
      height,
    };
  });

  useEffect(() => {
    // Marcar como hidratado después del primer render
    setIsHydrated(true);
    
    const updateOrientation = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setOrientation({
        isPortrait: height > width,
        isLandscape: width > height,
        width,
        height,
      });
    };

    // Actualizar orientación inmediatamente después de la hidratación
    updateOrientation();

    window.addEventListener('resize', updateOrientation);
    
    window.addEventListener('orientationchange', () => {
      setTimeout(updateOrientation, 100);
    });

    return () => {
      window.removeEventListener('resize', updateOrientation);
      window.removeEventListener('orientationchange', updateOrientation);
    };
  }, []);

  return {
    ...orientation,
    isHydrated,
  };
};

export default useOrientation;
