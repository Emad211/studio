import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// The googleAI() plugin automatically looks for the `GEMINI_API_KEY`
// environment variable. Make sure to set it in your .env file.
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});
