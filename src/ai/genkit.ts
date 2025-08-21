
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { getCredentials } from '@/lib/actions';

// The main `ai` object for the application.
// It will be configured asynchronously.
export const ai = genkit({
  plugins: [], // Plugins will be added dynamically
});

// A promise to ensure initialization is only done once.
export const initPromise = (async () => {
  try {
    const credentials = await getCredentials();
    const geminiApiKey = credentials.integrations?.geminiApiKey || process.env.GEMINI_API_KEY;

    if (!geminiApiKey) {
      console.warn("Gemini API Key is not configured. AI features will not be available.");
      // Configure with a dummy key to prevent crashes if no key is available.
      ai.configure({
        plugins: [googleAI({ apiKey: "YOUR_DUMMY_API_KEY_HERE" })],
      });
    } else {
      ai.configure({
        plugins: [googleAI({ apiKey: geminiApiKey })],
        // Flow-level configuration
        flow: {
          // All flows will use this model unless they override it.
          model: 'googleai/gemini-2.0-flash',
        },
      });
    }
  } catch (error) {
     console.error("Failed to initialize Genkit:", error);
     // Configure with a dummy key in case of any error during credential fetching.
     ai.configure({
        plugins: [googleAI({ apiKey: "YOUR_DUMMY_API_KEY_HERE" })],
      });
  }
})();
