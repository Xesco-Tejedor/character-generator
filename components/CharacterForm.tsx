
import React from 'react';
import { CharacterFormData, ShotType, ArtisticStyle } from '../types';
import { SHOT_TYPE_OPTIONS, ARTISTIC_STYLE_OPTIONS } from '../constants';
import { InputField } from './InputField';
import { SelectField } from './SelectField';
import { Section } from './Section';
import { PaletteIcon, CameraIcon, SparklesIcon } from './icons'; 
import { useLanguage } from '../hooks/useLanguage';

interface CharacterFormProps {
  formData: CharacterFormData;
  onFormChange: (field: keyof CharacterFormData, value: string | ShotType | ArtisticStyle) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const CharacterForm: React.FC<CharacterFormProps> = ({ formData, onFormChange, onSubmit, isLoading }) => {
  const { t } = useLanguage();
  
  const handleInputChange = (field: keyof CharacterFormData) => (value: string) => {
    onFormChange(field, value);
  };

  const handleSelectChange = <T extends ShotType | ArtisticStyle,>(field: keyof CharacterFormData) => (value: T) => {
    onFormChange(field, value);
  };

  const translatedShotTypeOptions = SHOT_TYPE_OPTIONS.map(option => ({
    ...option,
    label: t(option.label),
  }));

  const translatedArtisticStyleOptions = ARTISTIC_STYLE_OPTIONS.map(option => ({
    ...option,
    label: t(option.label),
  }));

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-8">
      <Section title={t('form.section.coreConcept')} icon={<PaletteIcon className="w-6 h-6" />}>
        <InputField
          label={t('form.species.label')}
          id="species"
          value={formData.species}
          onChange={handleInputChange('species')}
          placeholder={t('form.species.placeholder')}
          required
        />
        <InputField
          label={t('form.features.label')}
          id="features"
          type="textarea"
          value={formData.features}
          onChange={handleInputChange('features')}
          placeholder={t('form.features.placeholder')}
          rows={3}
          required
        />
      </Section>

      <Section title={t('form.section.attirePose')} icon={<CameraIcon className="w-6 h-6" />}>
        <InputField
          label={t('form.attire.label')}
          id="attire"
          type="textarea"
          value={formData.attire}
          onChange={handleInputChange('attire')}
          placeholder={t('form.attire.placeholder')}
          rows={3}
        />
        <InputField
          label={t('form.poseExpression.label')}
          id="poseExpression"
          value={formData.poseExpression}
          onChange={handleInputChange('poseExpression')}
          placeholder={t('form.poseExpression.placeholder')}
        />
      </Section>
      
      <Section title={t('form.section.visualStyle')} icon={<PaletteIcon className="w-6 h-6" />}>
        <SelectField
          label={t('form.shotType.label')}
          id="shotType"
          value={formData.shotType}
          onChange={handleSelectChange<ShotType>('shotType')}
          options={translatedShotTypeOptions}
          required
        />
        <SelectField
          label={t('form.artisticStyle.label')}
          id="artisticStyle"
          value={formData.artisticStyle}
          onChange={handleSelectChange<ArtisticStyle>('artisticStyle')}
          options={translatedArtisticStyleOptions}
          required
        />
        {formData.artisticStyle === ArtisticStyle.CUSTOM && (
          <InputField
            label={t('form.customArtisticStyle.label')}
            id="customArtisticStyle"
            type="textarea"
            value={formData.customArtisticStyle || ''}
            onChange={handleInputChange('customArtisticStyle')}
            placeholder={t('form.customArtisticStyle.placeholder')}
            rows={3}
            required 
          />
        )}
         <InputField
          label={t('form.background.label')}
          id="background"
          value={formData.background}
          onChange={handleInputChange('background')}
          placeholder={t('form.background.placeholder')}
        />
      </Section>

      <Section title={t('form.section.additionalDetails')} icon={<SparklesIcon className="w-5 h-5" />}>
        <InputField
          label={t('form.additionalNotes.label')}
          id="additionalNotes"
          type="textarea"
          value={formData.additionalNotes}
          onChange={handleInputChange('additionalNotes')}
          placeholder={t('form.additionalNotes.placeholder')}
          rows={2}
        />
      </Section>

    </form>
  );
};
