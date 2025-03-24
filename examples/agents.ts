#!/usr/bin/env -S npm run tsn -T

import { AgentConfig } from "llama-stack-client/resources/shared";

import { LlamaStackClient, ClientOptions } from 'llama-stack-client';

const options: ClientOptions = { baseURL: 'http://localhost:8321' };
if (process.env["TAVILY_SEARCH_API_KEY"]) {
  const tavilyHeader = JSON.stringify({tavily_search_api_key: process.env["TAVILY_SEARCH_API_KEY"]});
  options.defaultHeaders = { 'X-LlamaStack-Provider-Data': tavilyHeader  }
}
const client = new LlamaStackClient(options);

async function main() {
  const availableModels = (await client.models.list())
    .filter((model: any) => 
      model.model_type === 'llm' && 
      !model.identifier.includes('guard') &&
      !model.identifier.includes('405')
    )
    .map((model: any) => model.identifier);

  if (availableModels.length === 0) {
    console.log('No available models. Exiting.');
    return;
  }
  const selectedModel = availableModels[0];
  console.log(`Using model: ${selectedModel}`);

  // Check for Tavily API key
  if (!process.env["TAVILY_SEARCH_API_KEY"]) {
    console.log('Warning: TAVILY_SEARCH_API_KEY is not set; will not use websearch tool.');
  }

  // Configure agent
  const agentConfig: AgentConfig = {
    model: selectedModel,
    instructions: 'You are a helpful assistant',
    sampling_params: {
        strategy: { type: 'top_p', temperature: 1.0, top_p: 0.9 },
    },
    toolgroups: process.env["TAVILY_SEARCH_API_KEY"] ? ['builtin::websearch'] : [],
    tool_choice: 'auto',
    tool_prompt_format: 'python_list',
    input_shields: [],
    output_shields: [],
    enable_session_persistence: false,
    max_infer_iters: 10,
  };
  console.log('Agent Configuration:', JSON.stringify(agentConfig, null, 2));

  const agentic_system_create_response = await client.agents.create({agent_config: agentConfig});
  const agent_id = agentic_system_create_response.agent_id;
  console.log(`Agent ID: ${agent_id}`);
  const userPrompts = [
    'Hello',
    'What is local time currently in California? Search the web for the answer.',
  ];

  const create_session_response = await client.agents.session.create(agent_id, {session_name: 'test-session'});
  const session_id = create_session_response.session_id;
  console.log(`Session ID: ${session_id}`);

  for (const prompt of userPrompts) {
    const response = await client.agents.turn.create(
      agent_id,
      session_id,
      {
        stream: true,
        messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
      },
    );

    // Log the response events
    for await (const chunk of response) {
        if (chunk.event.payload.event_type === 'turn_complete') {
            console.log(chunk.event.payload.turn.output_message);
        }
    }
  }

}

main();
