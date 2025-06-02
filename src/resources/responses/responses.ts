// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import { APIPromise } from '../../core';
import * as Core from '../../core';
import * as ResponsesAPI from './responses';
import * as InputItemsAPI from './input-items';
import { InputItemListParams, InputItemListResponse, InputItems } from './input-items';
import { Stream } from '../../streaming';

export class Responses extends APIResource {
  inputItems: InputItemsAPI.InputItems = new InputItemsAPI.InputItems(this._client);

  /**
   * Create a new OpenAI response.
   */
  create(body: ResponseCreateParamsNonStreaming, options?: Core.RequestOptions): APIPromise<ResponseObject>;
  create(
    body: ResponseCreateParamsStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<ResponseObjectStream>>;
  create(
    body: ResponseCreateParamsBase,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<ResponseObjectStream> | ResponseObject>;
  create(
    body: ResponseCreateParams,
    options?: Core.RequestOptions,
  ): APIPromise<ResponseObject> | APIPromise<Stream<ResponseObjectStream>> {
    return this._client.post('/v1/openai/v1/responses', {
      body,
      ...options,
      stream: body.stream ?? false,
    }) as APIPromise<ResponseObject> | APIPromise<Stream<ResponseObjectStream>>;
  }

  /**
   * Retrieve an OpenAI response by its ID.
   */
  retrieve(responseId: string, options?: Core.RequestOptions): Core.APIPromise<ResponseObject> {
    return this._client.get(`/v1/openai/v1/responses/${responseId}`, options);
  }

  /**
   * List all OpenAI responses.
   */
  list(query?: ResponseListParams, options?: Core.RequestOptions): Core.APIPromise<ResponseListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<ResponseListResponse>;
  list(
    query: ResponseListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<ResponseListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/v1/openai/v1/responses', { query, ...options });
  }
}

export interface ResponseObject {
  id: string;

  created_at: number;

  model: string;

  object: 'response';

  output: Array<
    | ResponseObject.OpenAIResponseMessage
    | ResponseObject.OpenAIResponseOutputMessageWebSearchToolCall
    | ResponseObject.OpenAIResponseOutputMessageFunctionToolCall
    | ResponseObject.OpenAIResponseOutputMessageMcpCall
    | ResponseObject.OpenAIResponseOutputMessageMcpListTools
  >;

  parallel_tool_calls: boolean;

  status: string;

  error?: ResponseObject.Error;

  previous_response_id?: string;

  temperature?: number;

  top_p?: number;

  truncation?: string;

  user?: string;
}

export namespace ResponseObject {
  /**
   * Corresponds to the various Message types in the Responses API. They are all
   * under one type because the Responses API gives them all the same "type" value,
   * and there is no way to tell them apart in certain scenarios.
   */
  export interface OpenAIResponseMessage {
    content:
      | string
      | Array<
          | OpenAIResponseMessage.OpenAIResponseInputMessageContentText
          | OpenAIResponseMessage.OpenAIResponseInputMessageContentImage
        >
      | Array<OpenAIResponseMessage.UnionMember2>;

    role: 'system' | 'developer' | 'user' | 'assistant';

    type: 'message';

    id?: string;

    status?: string;
  }

  export namespace OpenAIResponseMessage {
    export interface OpenAIResponseInputMessageContentText {
      text: string;

      type: 'input_text';
    }

    export interface OpenAIResponseInputMessageContentImage {
      detail: 'low' | 'high' | 'auto';

      type: 'input_image';

      image_url?: string;
    }

    export interface UnionMember2 {
      text: string;

      type: 'output_text';
    }
  }

  export interface OpenAIResponseOutputMessageWebSearchToolCall {
    id: string;

    status: string;

    type: 'web_search_call';
  }

  export interface OpenAIResponseOutputMessageFunctionToolCall {
    arguments: string;

    call_id: string;

    name: string;

    type: 'function_call';

    id?: string;

    status?: string;
  }

  export interface OpenAIResponseOutputMessageMcpCall {
    id: string;

    arguments: string;

    name: string;

    server_label: string;

    type: 'mcp_call';

    error?: string;

    output?: string;
  }

  export interface OpenAIResponseOutputMessageMcpListTools {
    id: string;

    server_label: string;

    tools: Array<OpenAIResponseOutputMessageMcpListTools.Tool>;

    type: 'mcp_list_tools';
  }

  export namespace OpenAIResponseOutputMessageMcpListTools {
    export interface Tool {
      input_schema: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

      name: string;

      description?: string;
    }
  }

  export interface Error {
    code: string;

    message: string;
  }
}

export type ResponseObjectStream =
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseCreated
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseOutputTextDelta
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseCompleted;

export namespace ResponseObjectStream {
  export interface OpenAIResponseObjectStreamResponseCreated {
    response: ResponsesAPI.ResponseObject;

    type: 'response.created';
  }

  export interface OpenAIResponseObjectStreamResponseOutputTextDelta {
    content_index: number;

    delta: string;

    item_id: string;

    output_index: number;

    sequence_number: number;

    type: 'response.output_text.delta';
  }

  export interface OpenAIResponseObjectStreamResponseCompleted {
    response: ResponsesAPI.ResponseObject;

    type: 'response.completed';
  }
}

export interface ResponseListResponse {
  data: Array<ResponseListResponse.Data>;

  first_id: string;

  has_more: boolean;

  last_id: string;

  object: 'list';
}

export namespace ResponseListResponse {
  export interface Data {
    id: string;

    created_at: number;

    input: Array<
      | Data.OpenAIResponseOutputMessageWebSearchToolCall
      | Data.OpenAIResponseOutputMessageFunctionToolCall
      | Data.OpenAIResponseInputFunctionToolCallOutput
      | Data.OpenAIResponseMessage
    >;

    model: string;

    object: 'response';

    output: Array<
      | Data.OpenAIResponseMessage
      | Data.OpenAIResponseOutputMessageWebSearchToolCall
      | Data.OpenAIResponseOutputMessageFunctionToolCall
      | Data.OpenAIResponseOutputMessageMcpCall
      | Data.OpenAIResponseOutputMessageMcpListTools
    >;

    parallel_tool_calls: boolean;

    status: string;

    error?: Data.Error;

    previous_response_id?: string;

    temperature?: number;

    top_p?: number;

    truncation?: string;

    user?: string;
  }

  export namespace Data {
    export interface OpenAIResponseOutputMessageWebSearchToolCall {
      id: string;

      status: string;

      type: 'web_search_call';
    }

    export interface OpenAIResponseOutputMessageFunctionToolCall {
      arguments: string;

      call_id: string;

      name: string;

      type: 'function_call';

      id?: string;

      status?: string;
    }

    /**
     * This represents the output of a function call that gets passed back to the
     * model.
     */
    export interface OpenAIResponseInputFunctionToolCallOutput {
      call_id: string;

      output: string;

      type: 'function_call_output';

      id?: string;

      status?: string;
    }

    /**
     * Corresponds to the various Message types in the Responses API. They are all
     * under one type because the Responses API gives them all the same "type" value,
     * and there is no way to tell them apart in certain scenarios.
     */
    export interface OpenAIResponseMessage {
      content:
        | string
        | Array<
            | OpenAIResponseMessage.OpenAIResponseInputMessageContentText
            | OpenAIResponseMessage.OpenAIResponseInputMessageContentImage
          >
        | Array<OpenAIResponseMessage.UnionMember2>;

      role: 'system' | 'developer' | 'user' | 'assistant';

      type: 'message';

      id?: string;

      status?: string;
    }

    export namespace OpenAIResponseMessage {
      export interface OpenAIResponseInputMessageContentText {
        text: string;

        type: 'input_text';
      }

      export interface OpenAIResponseInputMessageContentImage {
        detail: 'low' | 'high' | 'auto';

        type: 'input_image';

        image_url?: string;
      }

      export interface UnionMember2 {
        text: string;

        type: 'output_text';
      }
    }

    /**
     * Corresponds to the various Message types in the Responses API. They are all
     * under one type because the Responses API gives them all the same "type" value,
     * and there is no way to tell them apart in certain scenarios.
     */
    export interface OpenAIResponseMessage {
      content:
        | string
        | Array<
            | OpenAIResponseMessage.OpenAIResponseInputMessageContentText
            | OpenAIResponseMessage.OpenAIResponseInputMessageContentImage
          >
        | Array<OpenAIResponseMessage.UnionMember2>;

      role: 'system' | 'developer' | 'user' | 'assistant';

      type: 'message';

      id?: string;

      status?: string;
    }

    export namespace OpenAIResponseMessage {
      export interface OpenAIResponseInputMessageContentText {
        text: string;

        type: 'input_text';
      }

      export interface OpenAIResponseInputMessageContentImage {
        detail: 'low' | 'high' | 'auto';

        type: 'input_image';

        image_url?: string;
      }

      export interface UnionMember2 {
        text: string;

        type: 'output_text';
      }
    }

    export interface OpenAIResponseOutputMessageWebSearchToolCall {
      id: string;

      status: string;

      type: 'web_search_call';
    }

    export interface OpenAIResponseOutputMessageFunctionToolCall {
      arguments: string;

      call_id: string;

      name: string;

      type: 'function_call';

      id?: string;

      status?: string;
    }

    export interface OpenAIResponseOutputMessageMcpCall {
      id: string;

      arguments: string;

      name: string;

      server_label: string;

      type: 'mcp_call';

      error?: string;

      output?: string;
    }

    export interface OpenAIResponseOutputMessageMcpListTools {
      id: string;

      server_label: string;

      tools: Array<OpenAIResponseOutputMessageMcpListTools.Tool>;

      type: 'mcp_list_tools';
    }

    export namespace OpenAIResponseOutputMessageMcpListTools {
      export interface Tool {
        input_schema: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

        name: string;

        description?: string;
      }
    }

    export interface Error {
      code: string;

      message: string;
    }
  }
}

export type ResponseCreateParams = ResponseCreateParamsNonStreaming | ResponseCreateParamsStreaming;

export interface ResponseCreateParamsBase {
  /**
   * Input message(s) to create the response.
   */
  input:
    | string
    | Array<
        | ResponseCreateParams.OpenAIResponseOutputMessageWebSearchToolCall
        | ResponseCreateParams.OpenAIResponseOutputMessageFunctionToolCall
        | ResponseCreateParams.OpenAIResponseInputFunctionToolCallOutput
        | ResponseCreateParams.OpenAIResponseMessage
      >;

  /**
   * The underlying LLM used for completions.
   */
  model: string;

  instructions?: string;

  /**
   * (Optional) if specified, the new response will be a continuation of the previous
   * response. This can be used to easily fork-off new responses from existing
   * responses.
   */
  previous_response_id?: string;

  store?: boolean;

  stream?: boolean;

  temperature?: number;

  tools?: Array<
    | ResponseCreateParams.OpenAIResponseInputToolWebSearch
    | ResponseCreateParams.OpenAIResponseInputToolFileSearch
    | ResponseCreateParams.OpenAIResponseInputToolFunction
    | ResponseCreateParams.OpenAIResponseInputToolMcp
  >;
}

export namespace ResponseCreateParams {
  export interface OpenAIResponseOutputMessageWebSearchToolCall {
    id: string;

    status: string;

    type: 'web_search_call';
  }

  export interface OpenAIResponseOutputMessageFunctionToolCall {
    arguments: string;

    call_id: string;

    name: string;

    type: 'function_call';

    id?: string;

    status?: string;
  }

  /**
   * This represents the output of a function call that gets passed back to the
   * model.
   */
  export interface OpenAIResponseInputFunctionToolCallOutput {
    call_id: string;

    output: string;

    type: 'function_call_output';

    id?: string;

    status?: string;
  }

  /**
   * Corresponds to the various Message types in the Responses API. They are all
   * under one type because the Responses API gives them all the same "type" value,
   * and there is no way to tell them apart in certain scenarios.
   */
  export interface OpenAIResponseMessage {
    content:
      | string
      | Array<
          | OpenAIResponseMessage.OpenAIResponseInputMessageContentText
          | OpenAIResponseMessage.OpenAIResponseInputMessageContentImage
        >
      | Array<OpenAIResponseMessage.UnionMember2>;

    role: 'system' | 'developer' | 'user' | 'assistant';

    type: 'message';

    id?: string;

    status?: string;
  }

  export namespace OpenAIResponseMessage {
    export interface OpenAIResponseInputMessageContentText {
      text: string;

      type: 'input_text';
    }

    export interface OpenAIResponseInputMessageContentImage {
      detail: 'low' | 'high' | 'auto';

      type: 'input_image';

      image_url?: string;
    }

    export interface UnionMember2 {
      text: string;

      type: 'output_text';
    }
  }

  export interface OpenAIResponseInputToolWebSearch {
    type: 'web_search' | 'web_search_preview_2025_03_11';

    search_context_size?: string;
  }

  export interface OpenAIResponseInputToolFileSearch {
    type: 'file_search';

    vector_store_id: Array<string>;

    ranking_options?: OpenAIResponseInputToolFileSearch.RankingOptions;
  }

  export namespace OpenAIResponseInputToolFileSearch {
    export interface RankingOptions {
      ranker?: string;

      score_threshold?: number;
    }
  }

  export interface OpenAIResponseInputToolFunction {
    name: string;

    type: 'function';

    description?: string;

    parameters?: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

    strict?: boolean;
  }

  export interface OpenAIResponseInputToolMcp {
    require_approval: 'always' | 'never' | OpenAIResponseInputToolMcp.ApprovalFilter;

    server_label: string;

    server_url: string;

    type: 'mcp';

    allowed_tools?: Array<string> | OpenAIResponseInputToolMcp.AllowedToolsFilter;

    headers?: Record<string, boolean | number | string | Array<unknown> | unknown | null>;
  }

  export namespace OpenAIResponseInputToolMcp {
    export interface ApprovalFilter {
      always?: Array<string>;

      never?: Array<string>;
    }

    export interface AllowedToolsFilter {
      tool_names?: Array<string>;
    }
  }

  export type ResponseCreateParamsNonStreaming = ResponsesAPI.ResponseCreateParamsNonStreaming;
  export type ResponseCreateParamsStreaming = ResponsesAPI.ResponseCreateParamsStreaming;
}

export interface ResponseCreateParamsNonStreaming extends ResponseCreateParamsBase {
  stream?: false;
}

export interface ResponseCreateParamsStreaming extends ResponseCreateParamsBase {
  stream: true;
}

export interface ResponseListParams {
  /**
   * The ID of the last response to return.
   */
  after?: string;

  /**
   * The number of responses to return.
   */
  limit?: number;

  /**
   * The model to filter responses by.
   */
  model?: string;

  /**
   * The order to sort responses by when sorted by created_at ('asc' or 'desc').
   */
  order?: 'asc' | 'desc';
}

Responses.InputItems = InputItems;

export declare namespace Responses {
  export {
    type ResponseObject as ResponseObject,
    type ResponseObjectStream as ResponseObjectStream,
    type ResponseListResponse as ResponseListResponse,
    type ResponseCreateParams as ResponseCreateParams,
    type ResponseCreateParamsNonStreaming as ResponseCreateParamsNonStreaming,
    type ResponseCreateParamsStreaming as ResponseCreateParamsStreaming,
    type ResponseListParams as ResponseListParams,
  };

  export {
    InputItems as InputItems,
    type InputItemListResponse as InputItemListResponse,
    type InputItemListParams as InputItemListParams,
  };
}
