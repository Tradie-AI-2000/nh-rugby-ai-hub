import { defineFlow } from 'genkit';
import { z } from 'zod';

/**
 * This is a simple echo flow.
 * It takes a prompt and returns it.
 */
export const echoAgentFlow = defineFlow(
  {
    name: 'echoAgentFlow',
    inputSchema: z.object({
      prompt: z.string(),
    }),
    outputSchema: z.object({
      response: z.string(),
    }),
  },
  async (input) => {
    return {
      response: `You said: ${input.prompt}`,
    };
  }
);
