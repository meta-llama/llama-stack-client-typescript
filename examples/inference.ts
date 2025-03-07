#!/usr/bin/env -S npm run tsn -T

import LlamaStackClient from 'llama-stack-client';
const client = new LlamaStackClient({ baseURL: 'http://localhost:8321' });

async function main() {
  // list models
  const availableModels = (await client.models.list())
    .filter((model: any) => 
      model.model_type === 'llm' && 
      !model.identifier.includes('guard') &&
      !model.identifier.includes('405')
    )
    .map((model: any) => model.identifier);
  
  console.log(availableModels);

  if (availableModels.length === 0) {
    console.log('No available models. Exiting.');
    return;
  }
  const selectedModel = availableModels[0];
  console.log(`Using model: ${selectedModel}`);

  // non-streaming chat-completion
  const chatCompletion = await client.inference.chatCompletion({
    messages: [{ content: 'Hello, how are you?', role: 'user' }],
    model_id: selectedModel,
  });
  console.log(chatCompletion);

  // streaming chat-completion
  const stream = await client.inference.chatCompletion({
    messages: [{ content: 'Hello, how are you?', role: 'user' }],
    model_id: selectedModel,
    stream: true,
  });
  for await (const chunk of stream) {
    if (chunk.event.delta.type === 'text') {
      process.stdout.write(chunk.event.delta.text || '');
    }
  }
  process.stdout.write('\n');
}

main();