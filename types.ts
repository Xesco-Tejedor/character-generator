
export enum ShotType {
  PORTRAIT = 'Portrait',
  FULL_BODY = 'Full Body',
  ACTION_SHOT = 'Action Shot'
}

export enum ArtisticStyle {
  PHOTOREALISTIC = 'Photorealistic',
  FANTASY_ART = 'Fantasy Art',
  ANIME_MANGA = 'Anime/Manga',
  PIXEL_ART = 'Pixel Art',
  COMIC_BOOK = 'Comic Book',
  SCI_FI_CONCEPT = 'Sci-Fi Concept Art',
  CARTOON = 'Cartoon Style',
  IMPRESSIONISTIC = 'Impressionistic Painting',
  CHARCOAL_SKETCH = 'Charcoal Sketch',
  CUSTOM = 'Custom Style'
}

export interface CharacterFormData {
  species: string;
  features: string;
  attire: string;
  poseExpression: string;
  background: string;
  shotType: ShotType;
  artisticStyle: ArtisticStyle;
  customArtisticStyle?: string; // Added for custom style description
  additionalNotes: string;
}

export interface GeneratedImage {
  src: string;
  alt: string;
}

export interface HistoryEntry {
  id: string; // Unique ID for each history entry, e.g., timestamp or UUID
  formData: CharacterFormData;
  image: GeneratedImage;
  timestamp: number; // Store as a number (e.g., Date.now())
}
