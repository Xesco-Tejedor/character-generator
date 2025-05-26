
import { GoogleGenAI } from "@google/genai"; // No GenerateContentResponse needed here
import { CharacterFormData, ArtisticStyle } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable is not set. Image generation will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

function constructPrompt(formData: CharacterFormData): string {
  const artisticStyleString = (formData.artisticStyle === ArtisticStyle.CUSTOM && formData.customArtisticStyle)
    ? formData.customArtisticStyle
    : formData.artisticStyle;

  return `
    Create a ${formData.shotType} visual of a character.
    Species/Type: ${formData.species}.
    Key Features: ${formData.features}.
    Attire/Clothing: ${formData.attire}.
    Pose and Expression: ${formData.poseExpression}.
    Background/Setting: ${formData.background}.
    Artistic Style: ${artisticStyleString}.
    Additional Notes: ${formData.additionalNotes}.
    
    Emphasize visual clarity, distinct character design, and adherence to the specified artistic style.
    The image should be highly detailed and visually engaging.
  `.trim().replace(/\s+/g, ' ');
}

export async function generateCharacterImage(formData: CharacterFormData): Promise<string> {
  if (!API_KEY) {
    throw new Error("API Key is not configured. Please set the API_KEY environment variable.");
  }

  const prompt = constructPrompt(formData);
  console.log("Generated Prompt:", prompt);

  try {
    const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: prompt,
        config: { 
          numberOfImages: 1, 
          outputMimeType: 'image/png',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image?.imageBytes) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/png;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No image data received from API or unexpected response structure.");
    }
  } catch (error) {
    console.error("Error generating image with Gemini API:", error);
    if (error instanceof Error) {
      if (error.message.includes("API key not valid")) {
        throw new Error("Invalid API Key. Please check your API_KEY environment variable.");
      }
      if (error.message.includes("quota")) {
        throw new Error("API quota exceeded. Please check your Google Cloud project quotas.");
      }
      // It's good practice to check for specific error codes or messages if the API provides them
      // For instance, if there's a specific error for "safety policy violation":
      // if (error.message.toLowerCase().includes("safety policy")) {
      //   throw new Error("The generated content may have violated safety policies. Please adjust your prompt.");
      // }
      throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the image.");
  }
}
