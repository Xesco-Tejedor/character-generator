
import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { GeneratedImage } from '../types';
import { useLanguage } from '../hooks/useLanguage';

interface ImageDisplayProps {
  image: GeneratedImage | null;
  isLoading: boolean;
  error: string | null;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ image, isLoading, error }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-slate-800 p-4 sm:p-6 rounded-xl shadow-2xl h-full flex flex-col items-center justify-center min-h-[300px] lg:min-h-[500px]">
      {isLoading && (
        <div className="text-center">
          <LoadingSpinner size="lg" text={t('imageDisplay.loadingText')}/>
          <p className="mt-4 text-slate-300 text-lg">{t('imageDisplay.loadingSubtext')}</p>
        </div>
      )}
      {error && !isLoading && (
        <div className="text-center text-red-400 p-4 bg-red-900/30 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">{t('imageDisplay.generationFailed')}</h3>
          <p>{error}</p> {/* Error message from service, potentially not translated */}
          <p className="mt-2 text-sm text-red-300">{t('imageDisplay.checkInputs')}</p>
        </div>
      )}
      {!isLoading && !error && image && (
        <div className="w-full h-full flex flex-col items-center">
          <img
            src={image.src}
            alt={image.alt} // Alt text is already translated in App.tsx before being passed
            className="max-w-full max-h-[calc(100%-3rem)] object-contain rounded-lg shadow-xl"
          />
           <p className="mt-4 text-sm text-slate-400 italic">{image.alt}</p>
        </div>
      )}
      {!isLoading && !error && !image && (
        <div className="text-center text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-2xl font-semibold">{t('imageDisplay.placeholderTitle')}</h3>
          <p className="mt-2">{t('imageDisplay.placeholderSubtitle')}</p>
        </div>
      )}
    </div>
  );
};
