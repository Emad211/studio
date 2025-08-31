
import { genkit, type Plugin } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { getCredentials } from '@/lib/actions';

// The main `ai` object for the application.
export let ai: any;

// A promise to ensure initialization is only done once.
export const initPromise = (async () => {
    try {
        const credentials = await getCredentials();
        const geminiApiKey = credentials.integrations?.geminiApiKey || process.env.GEMINI_API_KEY;

        const plugins: Plugin[] = [];

        if (geminiApiKey) {
            plugins.push(googleAI({ apiKey: geminiApiKey }));
        }

        ai = genkit({
            plugins: plugins,
            logLevel: 'debug',
            enableTracingAndMetrics: true,
        });

        if (!geminiApiKey) {
            console.warn("Gemini API Key is not configured. AI features will be limited.");
        }
    } catch (error) {
        console.error("Failed to initialize Genkit:", error);
        // Configure with no plugins in case of any error.
        ai = genkit({
            plugins: [],
            logLevel: 'warn',
            enableTracingAndMetrics: false,
        });
    }
})();
