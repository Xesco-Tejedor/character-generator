
import React, { useState, useCallback, useEffect } from 'react';
import { CharacterFormData, GeneratedImage, ShotType, ArtisticStyle, HistoryEntry } from './types';
import { DEFAULT_CHARACTER_FORM_DATA, ARTISTIC_STYLE_OPTIONS, MAX_HISTORY_ITEMS } from './constants';
import { CharacterForm } from './components/CharacterForm';
import { ImageDisplay } from './components/ImageDisplay';
import { IconButton } from './components/IconButton';
import { SparklesIcon } from './components/icons';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { HistoryPanel } from './components/HistoryPanel';
import { generateCharacterImage } from './services/geminiService';
import { useLanguage } from './hooks/useLanguage';

const APP_HISTORY_KEY = 'characterVisionStudioHistory';

const App: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<CharacterFormData>(DEFAULT_CHARACTER_FORM_DATA);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    try {
      const savedHistory = localStorage.getItem(APP_HISTORY_KEY);
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (e) {
      console.error("Failed to load history from localStorage", e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(APP_HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
      console.error("Failed to save history to localStorage", e);
    }
  }, [history]);

  const handleFormChange = useCallback((field: keyof CharacterFormData, value: string | ShotType | ArtisticStyle) => {
    setFormData(prev => {
      const newState = { ...prev, [field]: value };
      if (field === 'artisticStyle' && value !== ArtisticStyle.CUSTOM) {
        newState.customArtisticStyle = '';
      }
      return newState;
    });
  }, []);

  const addToHistory = (entryFormData: CharacterFormData, image: GeneratedImage) => {
    setHistory(prevHistory => {
      const newEntry: HistoryEntry = {
        id: Date.now().toString(), // Simple unique ID
        formData: { ...entryFormData },
        image: { ...image },
        timestamp: Date.now(),
      };
      const updatedHistory = [newEntry, ...prevHistory];
      return updatedHistory.slice(0, MAX_HISTORY_ITEMS);
    });
  };

  const restoreFromHistory = (entry: HistoryEntry) => {
    setFormData(entry.formData);
    setGeneratedImage(entry.image);
    setError(null); // Clear any previous errors
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    // Keep current image while loading new one, or clear it:
    // setGeneratedImage(null); 

    if (formData.artisticStyle === ArtisticStyle.CUSTOM && (!formData.customArtisticStyle || formData.customArtisticStyle.trim() === '')) {
        setError(t('error.customStyleDescriptionMissing'));
        setIsLoading(false);
        return;
    }

    try {
      const imageUrl = await generateCharacterImage(formData);
      
      const artisticStyleLabelKey = ARTISTIC_STYLE_OPTIONS.find(opt => opt.value === formData.artisticStyle)?.label;
      const translatedStyleName = artisticStyleLabelKey ? t(artisticStyleLabelKey) : formData.artisticStyle;

      const altText = formData.artisticStyle === ArtisticStyle.CUSTOM && formData.customArtisticStyle
        ? t('imageDisplay.imageAltTextCustom', { species: formData.species, customStyle: formData.customArtisticStyle })
        : t('imageDisplay.imageAltText', { species: formData.species, style: translatedStyleName });
      
      const newImage: GeneratedImage = {
        src: imageUrl,
        alt: altText,
      };
      setGeneratedImage(newImage);
      addToHistory(formData, newImage);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t('error.unknown'));
      }
      console.error("Submission error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 flex flex-col">
      <header className="mb-8 text-center">
        <div className="flex justify-center items-center mb-2 relative">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            {t('app.title')}
          </h1>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 md:relative md:top-auto md:right-auto md:ml-6">
             <LanguageSwitcher />
          </div>
        </div>
        <p className="text-slate-400 mt-2 text-lg">{t('app.tagline')}</p>
      </header>

      <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-slate-800 p-6 md:p-8 rounded-xl shadow-2xl overflow-y-auto max-h-[calc(100vh-12rem)]">
          <CharacterForm
            formData={formData}
            onFormChange={handleFormChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
           <div className="mt-8 pt-6 border-t border-slate-700">
            <IconButton
              icon={<SparklesIcon className="w-6 h-6" />}
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full text-lg py-3.5"
              aria-label={isLoading ? t('app.generatingVisionAriaLabel') : t('app.generateVisionAriaLabel')}
            >
              {isLoading ? t('app.generatingButton') : t('app.generateButton')}
            </IconButton>
          </div>
        </div>

        <div className="flex flex-col self-start lg:sticky lg:top-8 max-h-[calc(100vh-4rem)]"> {/* Adjust max-h as needed */}
          <ImageDisplay image={generatedImage} isLoading={isLoading} error={error} />
          <div className="flex-grow overflow-y-auto"> {/* This makes only HistoryPanel scroll if content overflows */}
            <HistoryPanel
              history={history}
              onRestore={restoreFromHistory}
              onClearHistory={clearHistory}
              maxHeight="calc(100vh - 500px - 4rem)" // Example: Adjust based on ImageDisplay typical height
            />
          </div>
        </div>
      </main>
      
      <footer className="text-center mt-12 py-6 border-t border-slate-700">
        <p className="text-sm text-slate-500">
          {t('footer.poweredBy')}
        </p>
      </footer>
    </div>
  );
};

export default App;
