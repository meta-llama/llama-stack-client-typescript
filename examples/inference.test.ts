import LlamaStackClient from 'llama-stack-client';

describe('LlamaStack Client Integration Tests', () => {
  let client: LlamaStackClient;
  let availableModels: string[];

  beforeAll(async () => {
    client = new LlamaStackClient({ baseURL: 'http://localhost:8321' });
    
    // Fetch available models once
    const models = await client.models.list();
    availableModels = models
      .filter((model: any) => 
        model.model_type === 'llm' && 
        !model.identifier.includes('guard') &&
        !model.identifier.includes('405')
      )
      .map((model: any) => model.identifier);
  });

  test('should list available models', async () => {
    const models = await client.models.list();
    expect(models).toBeDefined();
    expect(Array.isArray(models)).toBe(true);
  });

  test('should perform non-streaming chat completion', async () => {
    // Skip test if no models available
    if (availableModels.length === 0) {
      console.warn('Skipping test: No available models');
      return;
    }
    const chatCompletion = await client.inference.chatCompletion({
      messages: [{ content: 'Hello, how are you?', role: 'user' }],
      model_id: availableModels[0] as string,
    });
    expect(chatCompletion).toBeDefined();
    expect(chatCompletion.completion_message).toBeDefined();
  }, 30000);

  test('should perform streaming chat completion', async () => {
    // Skip test if no models available
    if (availableModels.length === 0) {
      console.warn('Skipping test: No available models');
      return;
    }
    const stream = await client.inference.chatCompletion({
      messages: [{ content: 'Hello, how are you?', role: 'user' }],
      model_id: availableModels[0] as string,
      stream: true,
    });

    const chunks: any[] = [];
    for await (const chunk of stream) {
      expect(chunk).toBeDefined();
      chunks.push(chunk);
    }
    expect(chunks.length).toBeGreaterThan(0);
  }, 30000);
});