
import React from 'react';
import { HistoryEntry, ArtisticStyle } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { ARTISTIC_STYLE_OPTIONS } from '../constants';
import { IconButton } from './IconButton'; // Assuming IconButton can be used for simple buttons too
import { CameraIcon } from './icons'; // Placeholder, replace with appropriate icon

interface HistoryPanelProps {
  history: HistoryEntry[];
  onRestore: (entry: HistoryEntry) => void;
  onClearHistory: () => void;
  maxHeight?: string;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onRestore, onClearHistory, maxHeight = "300px" }) => {
  const { t } = useLanguage();

  const getArtisticStyleLabel = (styleValue: ArtisticStyle, customStyle?: string): string => {
    if (styleValue === ArtisticStyle.CUSTOM && customStyle) {
      return t('history.customStyleLabel', { customStyle: customStyle.substring(0, 30) + (customStyle.length > 30 ? '...' : '') });
    }
    const styleOption = ARTISTIC_STYLE_OPTIONS.find(opt => opt.value === styleValue);
    return styleOption ? t(styleOption.label) : styleValue;
  };

  return (
    <div className="bg-slate-800 p-4 md:p-6 rounded-xl shadow-xl mt-6 md:mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-slate-200">{t('history.panelTitle')}</h3>
        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            aria-label={t('history.clearAriaLabel')}
          >
            {t('history.clearButton')}
          </button>
        )}
      </div>
      {history.length === 0 ? (
        <p className="text-slate-400 text-center py-4">{t('history.emptyMessage')}</p>
      ) : (
        <div className="overflow-y-auto space-y-3 pr-2" style={{ maxHeight }}>
          {history.map((entry) => (
            <div
              key={entry.id}
              className="bg-slate-700 p-3 rounded-lg flex items-center space-x-3 shadow-md"
            >
              <img
                src={entry.image.src}
                alt={t('history.thumbnailAlt', { species: entry.formData.species })}
                className="w-16 h-16 object-cover rounded-md flex-shrink-0"
              />
              <div className="flex-grow overflow-hidden">
                <p className="text-sm font-medium text-slate-200 truncate" title={entry.formData.species}>
                  {entry.formData.species}
                </p>
                <p className="text-xs text-slate-400 truncate" title={getArtisticStyleLabel(entry.formData.artisticStyle, entry.formData.customArtisticStyle)}>
                  {getArtisticStyleLabel(entry.formData.artisticStyle, entry.formData.customArtisticStyle)}
                </p>
                <p className="text-xs text-slate-500">
                  {new Date(entry.timestamp).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => onRestore(entry)}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-md shadow-sm transition-colors flex-shrink-0"
                aria-label={t('history.restoreAriaLabel', { species: entry.formData.species })}
              >
                {t('history.restoreButton')}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
