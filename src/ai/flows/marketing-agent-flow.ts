import { defineFlow } from '@genkit-ai/flow';
import { geminiPro } from '@genkit-ai/googleai';
import { z } from 'zod';

export const marketingAgent = defineFlow(
  {
    name: 'marketingAgent',
    inputSchema: z.object({
      prompt: z.string(),
    }),
    outputSchema: z.object({
      response: z.string(),
    }),
  },
  async (input) => {
    const llmResponse = await geminiPro.generate({
      prompt: `You are a creative marketing assistant. Help the user with their request: ${input.prompt}`,
    });

    return {
      response: llmResponse.text(),
    };
  }
);
