import { ShotType, ArtisticStyle } from './types';
import { TranslationKey } from './translations';

export const SHOT_TYPE_OPTIONS: { value: ShotType; label: TranslationKey }[] = [
  { value: ShotType.PORTRAIT, label: 'form.shotType.portrait' },
  { value: ShotType.FULL_BODY, label: 'form.shotType.fullBody' },
  { value: ShotType.ACTION_SHOT, label: 'form.shotType.actionShot' },
];

export const ARTISTIC_STYLE_OPTIONS: { value: ArtisticStyle; label: TranslationKey }[] = [
  { value: ArtisticStyle.PHOTOREALISTIC, label: 'form.artisticStyle.photorealistic' },
  { value: ArtisticStyle.FANTASY_ART, label: 'form.artisticStyle.fantasyArt' },
  { value: ArtisticStyle.ANIME_MANGA, label: 'form.artisticStyle.animeManga' },
  { value: ArtisticStyle.PIXEL_ART, label: 'form.artisticStyle.pixelArt' },
  { value: ArtisticStyle.COMIC_BOOK, label: 'form.artisticStyle.comicBook' },
  { value: ArtisticStyle.SCI_FI_CONCEPT, label: 'form.artisticStyle.sciFiConcept' },
  { value: ArtisticStyle.CARTOON, label: 'form.artisticStyle.cartoon' },
  { value: ArtisticStyle.IMPRESSIONISTIC, label: 'form.artisticStyle.impressionistic' },
  { value: ArtisticStyle.CHARCOAL_SKETCH, label: 'form.artisticStyle.charcoalSketch' },
  { value: ArtisticStyle.CUSTOM, label: 'form.artisticStyle.custom' },
];

export const DEFAULT_CHARACTER_FORM_DATA: import('./types').CharacterFormData = {
  species: 'Human warrior',
  features: 'Stoic expression, scar over left eye, short cropped dark hair',
  attire: 'Practical leather armor with metal pauldrons, rugged cloak',
  poseExpression: 'Standing confidently, gazing into the distance, holding a sword',
  background: 'Misty mountain pass at dawn',
  shotType: ShotType.FULL_BODY,
  artisticStyle: ArtisticStyle.FANTASY_ART,
  customArtisticStyle: '', 
  additionalNotes: 'Slightly weathered appearance, determined look.',
};

export const MAX_HISTORY_ITEMS = 10;
