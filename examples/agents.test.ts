import { AgentConfig } from "llama-stack-client/resources/shared";
import LlamaStackClient from 'llama-stack-client';


describe('RAG Integration Tests', () => {
  let client: LlamaStackClient;
  
  beforeEach(() => {
    // Create a new client instance
    client = new LlamaStackClient({ baseURL: 'http://localhost:8321' });
  });

  it('should create an agent and handle conversation successfully', async () => {
    // Get available models
    const models = await client.models.list();
    const llmModel = models.find(model => model.model_type === 'llm' && !model.identifier.includes('guard') && !model.identifier.includes('405'));
    expect(llmModel).toBeTruthy();

    // Create agent with configuration
    const agentConfig: AgentConfig = {
      model: llmModel!.identifier,
      instructions: 'You are a helpful assistant',
      sampling_params: {
        strategy: { type: 'top_p', temperature: 1.0, top_p: 0.9 },
      },
      toolgroups: [],
      tool_choice: 'auto',
      tool_prompt_format: 'json',
      input_shields: [],
      output_shields: [],
      enable_session_persistence: false,
      max_infer_iters: 10,
    };

    const agentResponse = await client.agents.create({ agent_config: agentConfig });
    expect(agentResponse.agent_id).toBeTruthy();

    const sessionResponse = await client.agents.session.create(agentResponse.agent_id, { session_name: 'test-session' });
    expect(sessionResponse.session_id).toBeTruthy();

    const userPrompts = [
        'Hello',
        'What is local time currently in California? Search the web for the answer.',
    ];
    for (const prompt of userPrompts) {
        const turnResponse = await client.agents.turn.create(
            agentResponse.agent_id,
            sessionResponse.session_id,
            {
                stream: true,
                messages: [
                {
                    role: 'user',
                    content: prompt,
                },
                ],
            }
        );
        // Test the response streaming
        for await (const chunk of turnResponse) {
            if (chunk.event.payload.event_type === 'turn_complete') {
                expect(chunk.event.payload.turn.output_message).toBeTruthy();
            }
        }
    }
  }, 30000);
});