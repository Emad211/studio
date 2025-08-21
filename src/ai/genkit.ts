import { genkit, GenerationCommonConfig } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { getSiteSettings } from '@/lib/actions';

// The googleAI() plugin configuration.
// It will be initialized asynchronously.
let googleAiPlugin: ReturnType<typeof googleAI>;

// A promise to ensure initialization is only done once.
let initPromise: Promise<void> | null = null;

async function initializeGenkit() {
  if (initPromise) {
    return initPromise;
  }
  
  initPromise = (async () => {
    const settings = await getSiteSettings();
    const geminiApiKey = settings.integrations?.geminiApiKey || process.env.GEMINI_API_KEY;

    if (!geminiApiKey) {
      console.warn("Gemini API Key is not configured. AI features will not be available.");
      googleAiPlugin = googleAI({ apiKey: "YOUR_DUMMY_API_KEY_HERE" }); // Provide a dummy key to avoid crashing
    } else {
      googleAiPlugin = googleAI({ apiKey: geminiApiKey });
    }
    
    // The main `ai` object configuration
    genkit({
      plugins: [googleAiPlugin],
      model: 'googleai/gemini-2.0-flash',
    });

  })();
  
  return initPromise;
}

// Custom `ai` object that ensures initialization before use.
export const ai = {
  defineFlow: (...args: Parameters<typeof genkit.defineFlow>) => {
    return genkit.defineFlow(...args);
  },
  definePrompt: (...args: Parameters<typeof genkit.definePrompt>) => {
    return genkit.definePrompt(...args);
  },
  generate: async (...args: Parameters<typeof genkit.generate>) => {
    await initializeGenkit();
    return genkit.generate(...args);
  },
   embed: async (...args: Parameters<typeof genkit.embed>) => {
    await initializeGenkit();
    return genkit.embed(...args);
  },
  // Add other genkit functions you use here...
};
