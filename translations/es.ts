
// translations/es.ts
import { AppTranslations } from './en';

export const es: AppTranslations = {
  'app.title': 'Generador de Personajes',
  'app.tagline': 'Crea visuales de personajes únicos con el poder de la IA.',
  'app.generateButton': 'Generar Visión',
  'app.generatingButton': 'Generando...',
  'app.generateVisionAriaLabel': 'Generar visión del personaje',
  'app.generatingVisionAriaLabel': 'Generando visión del personaje, por favor espera',
  'footer.poweredBy': 'Impulsado por Google Imagen & Gemini API. Creado con React & Tailwind CSS.',

  'form.section.coreConcept': 'Concepto Principal',
  'form.section.attirePose': 'Atuendo y Pose',
  'form.section.visualStyle': 'Estilo Visual y Composición',
  'form.section.additionalDetails': 'Detalles Adicionales',

  'form.species.label': 'Especie / Arquetipo',
  'form.species.placeholder': 'ej., Elfo explorador, hacker Ciberpunk, golem ancestral',
  'form.features.label': 'Rasgos Clave y Apariencia',
  'form.features.placeholder': 'ej., Ojos azules brillantes, tatuajes intrincados, brazo prostético metálico',
  'form.attire.label': 'Vestimenta y Atuendo',
  'form.attire.placeholder': 'ej., Capa con capucha, traje de combate reforzado, elegantes túnicas de seda',
  'form.poseExpression.label': 'Pose y Expresión',
  'form.poseExpression.placeholder': 'ej., Agachado, listo para atacar; Pose serena y meditativa',
  'form.background.label': 'Fondo / Escenario',
  'form.background.placeholder': 'ej., Bosque místico, paisaje urbano iluminado con neón, ruinas antiguas',
  'form.additionalNotes.label': 'Notas de Ajuste Fino (Opcional)',
  'form.additionalNotes.placeholder': "ej., Paleta de colores específica, ambiente, pequeños detalles como 'lleva un relicario de plata'",

  'form.shotType.label': 'Tipo de Plano',
  'form.shotType.portrait': 'Retrato (Cabeza y Hombros)',
  'form.shotType.fullBody': 'Cuerpo Completo',
  'form.shotType.actionShot': 'Plano de Acción',

  'form.artisticStyle.label': 'Estilo Artístico',
  'form.artisticStyle.photorealistic': 'Fotorrealista',
  'form.artisticStyle.fantasyArt': 'Ilustración de Arte Fantástico',
  'form.artisticStyle.animeManga': 'Estilo Anime / Manga',
  'form.artisticStyle.pixelArt': 'Pixel Art',
  'form.artisticStyle.comicBook': 'Estilo Cómic',
  'form.artisticStyle.sciFiConcept': 'Arte Conceptual Sci-Fi',
  'form.artisticStyle.cartoon': 'Estilo Caricatura',
  'form.artisticStyle.impressionistic': 'Pintura Impresionista',
  'form.artisticStyle.charcoalSketch': 'Boceto a Carbón',
  'form.artisticStyle.custom': 'Estilo Personalizado (Describir abajo)',
  'form.customArtisticStyle.label': 'Describe el Estilo Personalizado',
  'form.customArtisticStyle.placeholder': "ej., Inspirado en Van Gogh, ambiente Dark Souls, nombre de artista específico, juego pixel retro",

  'error.customStyleDescriptionMissing': "Por favor, describe tu estilo artístico personalizado cuando 'Estilo Personalizado' está seleccionado.",
  'error.unknown': 'Ocurrió un error desconocido.',
  
  'imageDisplay.loadingText': 'Creando tu visión...',
  'imageDisplay.loadingSubtext': 'Esto puede tomar un momento.',
  'imageDisplay.generationFailed': 'Falló la Generación',
  'imageDisplay.checkInputs': 'Por favor, revisa tus entradas o la configuración de la clave API e inténtalo de nuevo.',
  'imageDisplay.imageAltText': 'Imagen generada de {species} en estilo {style}',
  'imageDisplay.imageAltTextCustom': 'Imagen generada de {species} en estilo personalizado: {customStyle}',
  'imageDisplay.placeholderTitle': 'Tu Personaje Espera',
  'imageDisplay.placeholderSubtitle': 'Completa los detalles y haz clic en "Generar Visión" para dar vida a tu personaje.',

  'languageSwitcher.label': 'Idioma',
  'language.en': 'Inglés',
  'language.es': 'Español',

  'history.panelTitle': 'Historial de Generaciones',
  'history.clearButton': 'Limpiar Historial',
  'history.clearAriaLabel': 'Limpiar todo el historial de generaciones',
  'history.emptyMessage': 'Aún no hay generaciones en el historial. ¡Crea una!',
  'history.restoreButton': 'Restaurar',
  'history.restoreAriaLabel': 'Restaurar generación para {species}',
  'history.thumbnailAlt': 'Miniatura de {species}',
  'history.customStyleLabel': 'Personalizado: {customStyle}',
};

export default es;