import { configureGenkit } from '@genkit-ai/core';
import { googleAI } from '@genkit-ai/googleai';
import { defineFlow, run } from '@genkit-ai/flow';
import { z } from 'zod';

configureGenkit({
  plugins: [
    googleAI(),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

// Define a tool to get Joe Ward's contact information
const getJoeWardContactTool = defineFlow(
  {
    name: 'getJoeWardContact',
    inputSchema: z.object({}),
    outputSchema: z.object({
      email: z.string(),
      name: z.string(),
    }),
  },
  async () => {
    return { email: 'joe@tradieai.co.nz', name: 'Joe Ward' };
  }
);

// Define the main chatbot flow
export const chatFlow = defineFlow(
  {
    name: 'chat',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (prompt) => {
    // Check if the user is asking for Joe Ward's contact
    if (prompt.toLowerCase().includes('joe ward') && prompt.toLowerCase().includes('contact')) {
      const contact = await run(getJoeWardContactTool, {});
      return `You can contact ${contact.name} at ${contact.email}.`;
    }

    // Otherwise, use the LLM for general questions
    const llmResponse = await run(
      googleAI.generate({
        model: 'gemini-pro',
        prompt: prompt,
      })
    );
    return llmResponse.text();
  }
);
