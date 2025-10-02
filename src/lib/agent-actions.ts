'use server';

import { echoAgentFlow } from '@/ai/flows/echo-agent-flow';
import { marketingAgent } from '@/ai/flows/marketing-agent-flow';
import { vertexAgentFlow } from '@/ai/flows/vertex-agent-flow';

export async function runEchoAgent(prompt: string) {
  const result = await echoAgentFlow({ prompt });
  return result;
}

export async function runMarketingAgent(prompt: string) {
  const result = await marketingAgent({ prompt });
  return result;
}

export async function runVertexAgent(prompt: string, sessionId: string) {
  const result = await vertexAgentFlow({ prompt, sessionId });
  return result;
}
