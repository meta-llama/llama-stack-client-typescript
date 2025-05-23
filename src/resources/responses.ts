// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { APIPromise } from '../core';
import * as Core from '../core';
import * as ResponsesAPI from './responses';
import { Stream } from '../streaming';

export class Responses extends APIResource {
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
  retrieve(id: string, options?: Core.RequestOptions): Core.APIPromise<ResponseObject> {
    return this._client.get(`/v1/openai/v1/responses/${id}`, options);
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
    id: string;

    arguments: string;

    call_id: string;

    name: string;

    status: string;

    type: 'function_call';
  }

  export interface Error {
    code: string;

    message: string;
  }
}

export type ResponseObjectStream =
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseCreated
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseCompleted;

export namespace ResponseObjectStream {
  export interface OpenAIResponseObjectStreamResponseCreated {
    response: ResponsesAPI.ResponseObject;

    type: 'response.created';
  }

  export interface OpenAIResponseObjectStreamResponseCompleted {
    response: ResponsesAPI.ResponseObject;

    type: 'response.completed';
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
  >;
}

export namespace ResponseCreateParams {
  export interface OpenAIResponseOutputMessageWebSearchToolCall {
    id: string;

    status: string;

    type: 'web_search_call';
  }

  export interface OpenAIResponseOutputMessageFunctionToolCall {
    id: string;

    arguments: string;

    call_id: string;

    name: string;

    status: string;

    type: 'function_call';
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

  export type ResponseCreateParamsNonStreaming = ResponsesAPI.ResponseCreateParamsNonStreaming;
  export type ResponseCreateParamsStreaming = ResponsesAPI.ResponseCreateParamsStreaming;
}

export interface ResponseCreateParamsNonStreaming extends ResponseCreateParamsBase {
  stream?: false;
}

export interface ResponseCreateParamsStreaming extends ResponseCreateParamsBase {
  stream: true;
}

export declare namespace Responses {
  export {
    type ResponseObject as ResponseObject,
    type ResponseObjectStream as ResponseObjectStream,
    type ResponseCreateParams as ResponseCreateParams,
    type ResponseCreateParamsNonStreaming as ResponseCreateParamsNonStreaming,
    type ResponseCreateParamsStreaming as ResponseCreateParamsStreaming,
  };
}
