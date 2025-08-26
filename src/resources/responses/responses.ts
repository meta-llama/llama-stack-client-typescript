// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import { APIPromise } from '../../core';
import * as Core from '../../core';
import * as ResponsesAPI from './responses';
import * as InputItemsAPI from './input-items';
import { InputItemListParams, InputItemListResponse, InputItems } from './input-items';
import { OpenAICursorPage, type OpenAICursorPageParams } from '../../pagination';
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
  list(
    query?: ResponseListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ResponseListResponsesOpenAICursorPage, ResponseListResponse>;
  list(
    options?: Core.RequestOptions,
  ): Core.PagePromise<ResponseListResponsesOpenAICursorPage, ResponseListResponse>;
  list(
    query: ResponseListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<ResponseListResponsesOpenAICursorPage, ResponseListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/openai/v1/responses', ResponseListResponsesOpenAICursorPage, {
      query,
      ...options,
    });
  }
}

export class ResponseListResponsesOpenAICursorPage extends OpenAICursorPage<ResponseListResponse> {}

/**
 * Complete OpenAI response object containing generation results and metadata.
 */
export interface ResponseObject {
  /**
   * Unique identifier for this response
   */
  id: string;

  /**
   * Unix timestamp when the response was created
   */
  created_at: number;

  /**
   * Model identifier used for generation
   */
  model: string;

  /**
   * Object type identifier, always "response"
   */
  object: 'response';

  /**
   * List of generated output items (messages, tool calls, etc.)
   */
  output: Array<
    | ResponseObject.OpenAIResponseMessage
    | ResponseObject.OpenAIResponseOutputMessageWebSearchToolCall
    | ResponseObject.OpenAIResponseOutputMessageFileSearchToolCall
    | ResponseObject.OpenAIResponseOutputMessageFunctionToolCall
    | ResponseObject.OpenAIResponseOutputMessageMcpCall
    | ResponseObject.OpenAIResponseOutputMessageMcpListTools
  >;

  /**
   * Whether tool calls can be executed in parallel
   */
  parallel_tool_calls: boolean;

  /**
   * Current status of the response generation
   */
  status: string;

  /**
   * Text formatting configuration for the response
   */
  text: ResponseObject.Text;

  /**
   * (Optional) Error details if the response generation failed
   */
  error?: ResponseObject.Error;

  /**
   * (Optional) ID of the previous response in a conversation
   */
  previous_response_id?: string;

  /**
   * (Optional) Sampling temperature used for generation
   */
  temperature?: number;

  /**
   * (Optional) Nucleus sampling parameter used for generation
   */
  top_p?: number;

  /**
   * (Optional) Truncation strategy applied to the response
   */
  truncation?: string;

  /**
   * (Optional) User identifier associated with the request
   */
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
    /**
     * Text content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentText {
      /**
       * The text content of the input message
       */
      text: string;

      /**
       * Content type identifier, always "input_text"
       */
      type: 'input_text';
    }

    /**
     * Image content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentImage {
      /**
       * Level of detail for image processing, can be "low", "high", or "auto"
       */
      detail: 'low' | 'high' | 'auto';

      /**
       * Content type identifier, always "input_image"
       */
      type: 'input_image';

      /**
       * (Optional) URL of the image content
       */
      image_url?: string;
    }

    export interface UnionMember2 {
      annotations: Array<
        | UnionMember2.OpenAIResponseAnnotationFileCitation
        | UnionMember2.OpenAIResponseAnnotationCitation
        | UnionMember2.OpenAIResponseAnnotationContainerFileCitation
        | UnionMember2.OpenAIResponseAnnotationFilePath
      >;

      text: string;

      type: 'output_text';
    }

    export namespace UnionMember2 {
      /**
       * File citation annotation for referencing specific files in response content.
       */
      export interface OpenAIResponseAnnotationFileCitation {
        /**
         * Unique identifier of the referenced file
         */
        file_id: string;

        /**
         * Name of the referenced file
         */
        filename: string;

        /**
         * Position index of the citation within the content
         */
        index: number;

        /**
         * Annotation type identifier, always "file_citation"
         */
        type: 'file_citation';
      }

      /**
       * URL citation annotation for referencing external web resources.
       */
      export interface OpenAIResponseAnnotationCitation {
        /**
         * End position of the citation span in the content
         */
        end_index: number;

        /**
         * Start position of the citation span in the content
         */
        start_index: number;

        /**
         * Title of the referenced web resource
         */
        title: string;

        /**
         * Annotation type identifier, always "url_citation"
         */
        type: 'url_citation';

        /**
         * URL of the referenced web resource
         */
        url: string;
      }

      export interface OpenAIResponseAnnotationContainerFileCitation {
        container_id: string;

        end_index: number;

        file_id: string;

        filename: string;

        start_index: number;

        type: 'container_file_citation';
      }

      export interface OpenAIResponseAnnotationFilePath {
        file_id: string;

        index: number;

        type: 'file_path';
      }
    }
  }

  /**
   * Web search tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageWebSearchToolCall {
    /**
     * Unique identifier for this tool call
     */
    id: string;

    /**
     * Current status of the web search operation
     */
    status: string;

    /**
     * Tool call type identifier, always "web_search_call"
     */
    type: 'web_search_call';
  }

  /**
   * File search tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageFileSearchToolCall {
    /**
     * Unique identifier for this tool call
     */
    id: string;

    /**
     * List of search queries executed
     */
    queries: Array<string>;

    /**
     * Current status of the file search operation
     */
    status: string;

    /**
     * Tool call type identifier, always "file_search_call"
     */
    type: 'file_search_call';

    /**
     * (Optional) Search results returned by the file search operation
     */
    results?: Array<OpenAIResponseOutputMessageFileSearchToolCall.Result>;
  }

  export namespace OpenAIResponseOutputMessageFileSearchToolCall {
    /**
     * Search results returned by the file search operation.
     */
    export interface Result {
      /**
       * (Optional) Key-value attributes associated with the file
       */
      attributes: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

      /**
       * Unique identifier of the file containing the result
       */
      file_id: string;

      /**
       * Name of the file containing the result
       */
      filename: string;

      /**
       * Relevance score for this search result (between 0 and 1)
       */
      score: number;

      /**
       * Text content of the search result
       */
      text: string;
    }
  }

  /**
   * Function tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageFunctionToolCall {
    /**
     * JSON string containing the function arguments
     */
    arguments: string;

    /**
     * Unique identifier for the function call
     */
    call_id: string;

    /**
     * Name of the function being called
     */
    name: string;

    /**
     * Tool call type identifier, always "function_call"
     */
    type: 'function_call';

    /**
     * (Optional) Additional identifier for the tool call
     */
    id?: string;

    /**
     * (Optional) Current status of the function call execution
     */
    status?: string;
  }

  /**
   * Model Context Protocol (MCP) call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageMcpCall {
    /**
     * Unique identifier for this MCP call
     */
    id: string;

    /**
     * JSON string containing the MCP call arguments
     */
    arguments: string;

    /**
     * Name of the MCP method being called
     */
    name: string;

    /**
     * Label identifying the MCP server handling the call
     */
    server_label: string;

    /**
     * Tool call type identifier, always "mcp_call"
     */
    type: 'mcp_call';

    /**
     * (Optional) Error message if the MCP call failed
     */
    error?: string;

    /**
     * (Optional) Output result from the successful MCP call
     */
    output?: string;
  }

  /**
   * MCP list tools output message containing available tools from an MCP server.
   */
  export interface OpenAIResponseOutputMessageMcpListTools {
    /**
     * Unique identifier for this MCP list tools operation
     */
    id: string;

    /**
     * Label identifying the MCP server providing the tools
     */
    server_label: string;

    /**
     * List of available tools provided by the MCP server
     */
    tools: Array<OpenAIResponseOutputMessageMcpListTools.Tool>;

    /**
     * Tool call type identifier, always "mcp_list_tools"
     */
    type: 'mcp_list_tools';
  }

  export namespace OpenAIResponseOutputMessageMcpListTools {
    /**
     * Tool definition returned by MCP list tools operation.
     */
    export interface Tool {
      /**
       * JSON schema defining the tool's input parameters
       */
      input_schema: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

      /**
       * Name of the tool
       */
      name: string;

      /**
       * (Optional) Description of what the tool does
       */
      description?: string;
    }
  }

  /**
   * Text formatting configuration for the response
   */
  export interface Text {
    /**
     * (Optional) Text format configuration specifying output format requirements
     */
    format?: Text.Format;
  }

  export namespace Text {
    /**
     * (Optional) Text format configuration specifying output format requirements
     */
    export interface Format {
      /**
       * Must be "text", "json_schema", or "json_object" to identify the format type
       */
      type: 'text' | 'json_schema' | 'json_object';

      /**
       * (Optional) A description of the response format. Only used for json_schema.
       */
      description?: string;

      /**
       * The name of the response format. Only used for json_schema.
       */
      name?: string;

      /**
       * The JSON schema the response should conform to. In a Python SDK, this is often a
       * `pydantic` model. Only used for json_schema.
       */
      schema?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

      /**
       * (Optional) Whether to strictly enforce the JSON schema. If true, the response
       * must match the schema exactly. Only used for json_schema.
       */
      strict?: boolean;
    }
  }

  /**
   * (Optional) Error details if the response generation failed
   */
  export interface Error {
    /**
     * Error code identifying the type of failure
     */
    code: string;

    /**
     * Human-readable error message describing the failure
     */
    message: string;
  }
}

/**
 * Streaming event indicating a new response has been created.
 */
export type ResponseObjectStream =
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseCreated
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseOutputItemAdded
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseOutputItemDone
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseOutputTextDelta
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseOutputTextDone
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseFunctionCallArgumentsDelta
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseFunctionCallArgumentsDone
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseWebSearchCallInProgress
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseWebSearchCallSearching
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseWebSearchCallCompleted
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseMcpListToolsInProgress
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseMcpListToolsFailed
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseMcpListToolsCompleted
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseMcpCallArgumentsDelta
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseMcpCallArgumentsDone
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseMcpCallInProgress
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseMcpCallFailed
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseMcpCallCompleted
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseContentPartAdded
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseContentPartDone
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseCompleted;

export namespace ResponseObjectStream {
  /**
   * Streaming event indicating a new response has been created.
   */
  export interface OpenAIResponseObjectStreamResponseCreated {
    /**
     * The newly created response object
     */
    response: ResponsesAPI.ResponseObject;

    /**
     * Event type identifier, always "response.created"
     */
    type: 'response.created';
  }

  /**
   * Streaming event for when a new output item is added to the response.
   */
  export interface OpenAIResponseObjectStreamResponseOutputItemAdded {
    /**
     * The output item that was added (message, tool call, etc.)
     */
    item:
      | OpenAIResponseObjectStreamResponseOutputItemAdded.OpenAIResponseMessage
      | OpenAIResponseObjectStreamResponseOutputItemAdded.OpenAIResponseOutputMessageWebSearchToolCall
      | OpenAIResponseObjectStreamResponseOutputItemAdded.OpenAIResponseOutputMessageFileSearchToolCall
      | OpenAIResponseObjectStreamResponseOutputItemAdded.OpenAIResponseOutputMessageFunctionToolCall
      | OpenAIResponseObjectStreamResponseOutputItemAdded.OpenAIResponseOutputMessageMcpCall
      | OpenAIResponseObjectStreamResponseOutputItemAdded.OpenAIResponseOutputMessageMcpListTools;

    /**
     * Index position of this item in the output list
     */
    output_index: number;

    /**
     * Unique identifier of the response containing this output
     */
    response_id: string;

    /**
     * Sequential number for ordering streaming events
     */
    sequence_number: number;

    /**
     * Event type identifier, always "response.output_item.added"
     */
    type: 'response.output_item.added';
  }

  export namespace OpenAIResponseObjectStreamResponseOutputItemAdded {
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
      /**
       * Text content for input messages in OpenAI response format.
       */
      export interface OpenAIResponseInputMessageContentText {
        /**
         * The text content of the input message
         */
        text: string;

        /**
         * Content type identifier, always "input_text"
         */
        type: 'input_text';
      }

      /**
       * Image content for input messages in OpenAI response format.
       */
      export interface OpenAIResponseInputMessageContentImage {
        /**
         * Level of detail for image processing, can be "low", "high", or "auto"
         */
        detail: 'low' | 'high' | 'auto';

        /**
         * Content type identifier, always "input_image"
         */
        type: 'input_image';

        /**
         * (Optional) URL of the image content
         */
        image_url?: string;
      }

      export interface UnionMember2 {
        annotations: Array<
          | UnionMember2.OpenAIResponseAnnotationFileCitation
          | UnionMember2.OpenAIResponseAnnotationCitation
          | UnionMember2.OpenAIResponseAnnotationContainerFileCitation
          | UnionMember2.OpenAIResponseAnnotationFilePath
        >;

        text: string;

        type: 'output_text';
      }

      export namespace UnionMember2 {
        /**
         * File citation annotation for referencing specific files in response content.
         */
        export interface OpenAIResponseAnnotationFileCitation {
          /**
           * Unique identifier of the referenced file
           */
          file_id: string;

          /**
           * Name of the referenced file
           */
          filename: string;

          /**
           * Position index of the citation within the content
           */
          index: number;

          /**
           * Annotation type identifier, always "file_citation"
           */
          type: 'file_citation';
        }

        /**
         * URL citation annotation for referencing external web resources.
         */
        export interface OpenAIResponseAnnotationCitation {
          /**
           * End position of the citation span in the content
           */
          end_index: number;

          /**
           * Start position of the citation span in the content
           */
          start_index: number;

          /**
           * Title of the referenced web resource
           */
          title: string;

          /**
           * Annotation type identifier, always "url_citation"
           */
          type: 'url_citation';

          /**
           * URL of the referenced web resource
           */
          url: string;
        }

        export interface OpenAIResponseAnnotationContainerFileCitation {
          container_id: string;

          end_index: number;

          file_id: string;

          filename: string;

          start_index: number;

          type: 'container_file_citation';
        }

        export interface OpenAIResponseAnnotationFilePath {
          file_id: string;

          index: number;

          type: 'file_path';
        }
      }
    }

    /**
     * Web search tool call output message for OpenAI responses.
     */
    export interface OpenAIResponseOutputMessageWebSearchToolCall {
      /**
       * Unique identifier for this tool call
       */
      id: string;

      /**
       * Current status of the web search operation
       */
      status: string;

      /**
       * Tool call type identifier, always "web_search_call"
       */
      type: 'web_search_call';
    }

    /**
     * File search tool call output message for OpenAI responses.
     */
    export interface OpenAIResponseOutputMessageFileSearchToolCall {
      /**
       * Unique identifier for this tool call
       */
      id: string;

      /**
       * List of search queries executed
       */
      queries: Array<string>;

      /**
       * Current status of the file search operation
       */
      status: string;

      /**
       * Tool call type identifier, always "file_search_call"
       */
      type: 'file_search_call';

      /**
       * (Optional) Search results returned by the file search operation
       */
      results?: Array<OpenAIResponseOutputMessageFileSearchToolCall.Result>;
    }

    export namespace OpenAIResponseOutputMessageFileSearchToolCall {
      /**
       * Search results returned by the file search operation.
       */
      export interface Result {
        /**
         * (Optional) Key-value attributes associated with the file
         */
        attributes: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

        /**
         * Unique identifier of the file containing the result
         */
        file_id: string;

        /**
         * Name of the file containing the result
         */
        filename: string;

        /**
         * Relevance score for this search result (between 0 and 1)
         */
        score: number;

        /**
         * Text content of the search result
         */
        text: string;
      }
    }

    /**
     * Function tool call output message for OpenAI responses.
     */
    export interface OpenAIResponseOutputMessageFunctionToolCall {
      /**
       * JSON string containing the function arguments
       */
      arguments: string;

      /**
       * Unique identifier for the function call
       */
      call_id: string;

      /**
       * Name of the function being called
       */
      name: string;

      /**
       * Tool call type identifier, always "function_call"
       */
      type: 'function_call';

      /**
       * (Optional) Additional identifier for the tool call
       */
      id?: string;

      /**
       * (Optional) Current status of the function call execution
       */
      status?: string;
    }

    /**
     * Model Context Protocol (MCP) call output message for OpenAI responses.
     */
    export interface OpenAIResponseOutputMessageMcpCall {
      /**
       * Unique identifier for this MCP call
       */
      id: string;

      /**
       * JSON string containing the MCP call arguments
       */
      arguments: string;

      /**
       * Name of the MCP method being called
       */
      name: string;

      /**
       * Label identifying the MCP server handling the call
       */
      server_label: string;

      /**
       * Tool call type identifier, always "mcp_call"
       */
      type: 'mcp_call';

      /**
       * (Optional) Error message if the MCP call failed
       */
      error?: string;

      /**
       * (Optional) Output result from the successful MCP call
       */
      output?: string;
    }

    /**
     * MCP list tools output message containing available tools from an MCP server.
     */
    export interface OpenAIResponseOutputMessageMcpListTools {
      /**
       * Unique identifier for this MCP list tools operation
       */
      id: string;

      /**
       * Label identifying the MCP server providing the tools
       */
      server_label: string;

      /**
       * List of available tools provided by the MCP server
       */
      tools: Array<OpenAIResponseOutputMessageMcpListTools.Tool>;

      /**
       * Tool call type identifier, always "mcp_list_tools"
       */
      type: 'mcp_list_tools';
    }

    export namespace OpenAIResponseOutputMessageMcpListTools {
      /**
       * Tool definition returned by MCP list tools operation.
       */
      export interface Tool {
        /**
         * JSON schema defining the tool's input parameters
         */
        input_schema: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

        /**
         * Name of the tool
         */
        name: string;

        /**
         * (Optional) Description of what the tool does
         */
        description?: string;
      }
    }
  }

  /**
   * Streaming event for when an output item is completed.
   */
  export interface OpenAIResponseObjectStreamResponseOutputItemDone {
    /**
     * The completed output item (message, tool call, etc.)
     */
    item:
      | OpenAIResponseObjectStreamResponseOutputItemDone.OpenAIResponseMessage
      | OpenAIResponseObjectStreamResponseOutputItemDone.OpenAIResponseOutputMessageWebSearchToolCall
      | OpenAIResponseObjectStreamResponseOutputItemDone.OpenAIResponseOutputMessageFileSearchToolCall
      | OpenAIResponseObjectStreamResponseOutputItemDone.OpenAIResponseOutputMessageFunctionToolCall
      | OpenAIResponseObjectStreamResponseOutputItemDone.OpenAIResponseOutputMessageMcpCall
      | OpenAIResponseObjectStreamResponseOutputItemDone.OpenAIResponseOutputMessageMcpListTools;

    /**
     * Index position of this item in the output list
     */
    output_index: number;

    /**
     * Unique identifier of the response containing this output
     */
    response_id: string;

    /**
     * Sequential number for ordering streaming events
     */
    sequence_number: number;

    /**
     * Event type identifier, always "response.output_item.done"
     */
    type: 'response.output_item.done';
  }

  export namespace OpenAIResponseObjectStreamResponseOutputItemDone {
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
      /**
       * Text content for input messages in OpenAI response format.
       */
      export interface OpenAIResponseInputMessageContentText {
        /**
         * The text content of the input message
         */
        text: string;

        /**
         * Content type identifier, always "input_text"
         */
        type: 'input_text';
      }

      /**
       * Image content for input messages in OpenAI response format.
       */
      export interface OpenAIResponseInputMessageContentImage {
        /**
         * Level of detail for image processing, can be "low", "high", or "auto"
         */
        detail: 'low' | 'high' | 'auto';

        /**
         * Content type identifier, always "input_image"
         */
        type: 'input_image';

        /**
         * (Optional) URL of the image content
         */
        image_url?: string;
      }

      export interface UnionMember2 {
        annotations: Array<
          | UnionMember2.OpenAIResponseAnnotationFileCitation
          | UnionMember2.OpenAIResponseAnnotationCitation
          | UnionMember2.OpenAIResponseAnnotationContainerFileCitation
          | UnionMember2.OpenAIResponseAnnotationFilePath
        >;

        text: string;

        type: 'output_text';
      }

      export namespace UnionMember2 {
        /**
         * File citation annotation for referencing specific files in response content.
         */
        export interface OpenAIResponseAnnotationFileCitation {
          /**
           * Unique identifier of the referenced file
           */
          file_id: string;

          /**
           * Name of the referenced file
           */
          filename: string;

          /**
           * Position index of the citation within the content
           */
          index: number;

          /**
           * Annotation type identifier, always "file_citation"
           */
          type: 'file_citation';
        }

        /**
         * URL citation annotation for referencing external web resources.
         */
        export interface OpenAIResponseAnnotationCitation {
          /**
           * End position of the citation span in the content
           */
          end_index: number;

          /**
           * Start position of the citation span in the content
           */
          start_index: number;

          /**
           * Title of the referenced web resource
           */
          title: string;

          /**
           * Annotation type identifier, always "url_citation"
           */
          type: 'url_citation';

          /**
           * URL of the referenced web resource
           */
          url: string;
        }

        export interface OpenAIResponseAnnotationContainerFileCitation {
          container_id: string;

          end_index: number;

          file_id: string;

          filename: string;

          start_index: number;

          type: 'container_file_citation';
        }

        export interface OpenAIResponseAnnotationFilePath {
          file_id: string;

          index: number;

          type: 'file_path';
        }
      }
    }

    /**
     * Web search tool call output message for OpenAI responses.
     */
    export interface OpenAIResponseOutputMessageWebSearchToolCall {
      /**
       * Unique identifier for this tool call
       */
      id: string;

      /**
       * Current status of the web search operation
       */
      status: string;

      /**
       * Tool call type identifier, always "web_search_call"
       */
      type: 'web_search_call';
    }

    /**
     * File search tool call output message for OpenAI responses.
     */
    export interface OpenAIResponseOutputMessageFileSearchToolCall {
      /**
       * Unique identifier for this tool call
       */
      id: string;

      /**
       * List of search queries executed
       */
      queries: Array<string>;

      /**
       * Current status of the file search operation
       */
      status: string;

      /**
       * Tool call type identifier, always "file_search_call"
       */
      type: 'file_search_call';

      /**
       * (Optional) Search results returned by the file search operation
       */
      results?: Array<OpenAIResponseOutputMessageFileSearchToolCall.Result>;
    }

    export namespace OpenAIResponseOutputMessageFileSearchToolCall {
      /**
       * Search results returned by the file search operation.
       */
      export interface Result {
        /**
         * (Optional) Key-value attributes associated with the file
         */
        attributes: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

        /**
         * Unique identifier of the file containing the result
         */
        file_id: string;

        /**
         * Name of the file containing the result
         */
        filename: string;

        /**
         * Relevance score for this search result (between 0 and 1)
         */
        score: number;

        /**
         * Text content of the search result
         */
        text: string;
      }
    }

    /**
     * Function tool call output message for OpenAI responses.
     */
    export interface OpenAIResponseOutputMessageFunctionToolCall {
      /**
       * JSON string containing the function arguments
       */
      arguments: string;

      /**
       * Unique identifier for the function call
       */
      call_id: string;

      /**
       * Name of the function being called
       */
      name: string;

      /**
       * Tool call type identifier, always "function_call"
       */
      type: 'function_call';

      /**
       * (Optional) Additional identifier for the tool call
       */
      id?: string;

      /**
       * (Optional) Current status of the function call execution
       */
      status?: string;
    }

    /**
     * Model Context Protocol (MCP) call output message for OpenAI responses.
     */
    export interface OpenAIResponseOutputMessageMcpCall {
      /**
       * Unique identifier for this MCP call
       */
      id: string;

      /**
       * JSON string containing the MCP call arguments
       */
      arguments: string;

      /**
       * Name of the MCP method being called
       */
      name: string;

      /**
       * Label identifying the MCP server handling the call
       */
      server_label: string;

      /**
       * Tool call type identifier, always "mcp_call"
       */
      type: 'mcp_call';

      /**
       * (Optional) Error message if the MCP call failed
       */
      error?: string;

      /**
       * (Optional) Output result from the successful MCP call
       */
      output?: string;
    }

    /**
     * MCP list tools output message containing available tools from an MCP server.
     */
    export interface OpenAIResponseOutputMessageMcpListTools {
      /**
       * Unique identifier for this MCP list tools operation
       */
      id: string;

      /**
       * Label identifying the MCP server providing the tools
       */
      server_label: string;

      /**
       * List of available tools provided by the MCP server
       */
      tools: Array<OpenAIResponseOutputMessageMcpListTools.Tool>;

      /**
       * Tool call type identifier, always "mcp_list_tools"
       */
      type: 'mcp_list_tools';
    }

    export namespace OpenAIResponseOutputMessageMcpListTools {
      /**
       * Tool definition returned by MCP list tools operation.
       */
      export interface Tool {
        /**
         * JSON schema defining the tool's input parameters
         */
        input_schema: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

        /**
         * Name of the tool
         */
        name: string;

        /**
         * (Optional) Description of what the tool does
         */
        description?: string;
      }
    }
  }

  /**
   * Streaming event for incremental text content updates.
   */
  export interface OpenAIResponseObjectStreamResponseOutputTextDelta {
    /**
     * Index position within the text content
     */
    content_index: number;

    /**
     * Incremental text content being added
     */
    delta: string;

    /**
     * Unique identifier of the output item being updated
     */
    item_id: string;

    /**
     * Index position of the item in the output list
     */
    output_index: number;

    /**
     * Sequential number for ordering streaming events
     */
    sequence_number: number;

    /**
     * Event type identifier, always "response.output_text.delta"
     */
    type: 'response.output_text.delta';
  }

  /**
   * Streaming event for when text output is completed.
   */
  export interface OpenAIResponseObjectStreamResponseOutputTextDone {
    /**
     * Index position within the text content
     */
    content_index: number;

    /**
     * Unique identifier of the completed output item
     */
    item_id: string;

    /**
     * Index position of the item in the output list
     */
    output_index: number;

    /**
     * Sequential number for ordering streaming events
     */
    sequence_number: number;

    /**
     * Final complete text content of the output item
     */
    text: string;

    /**
     * Event type identifier, always "response.output_text.done"
     */
    type: 'response.output_text.done';
  }

  /**
   * Streaming event for incremental function call argument updates.
   */
  export interface OpenAIResponseObjectStreamResponseFunctionCallArgumentsDelta {
    /**
     * Incremental function call arguments being added
     */
    delta: string;

    /**
     * Unique identifier of the function call being updated
     */
    item_id: string;

    /**
     * Index position of the item in the output list
     */
    output_index: number;

    /**
     * Sequential number for ordering streaming events
     */
    sequence_number: number;

    /**
     * Event type identifier, always "response.function_call_arguments.delta"
     */
    type: 'response.function_call_arguments.delta';
  }

  /**
   * Streaming event for when function call arguments are completed.
   */
  export interface OpenAIResponseObjectStreamResponseFunctionCallArgumentsDone {
    /**
     * Final complete arguments JSON string for the function call
     */
    arguments: string;

    /**
     * Unique identifier of the completed function call
     */
    item_id: string;

    /**
     * Index position of the item in the output list
     */
    output_index: number;

    /**
     * Sequential number for ordering streaming events
     */
    sequence_number: number;

    /**
     * Event type identifier, always "response.function_call_arguments.done"
     */
    type: 'response.function_call_arguments.done';
  }

  /**
   * Streaming event for web search calls in progress.
   */
  export interface OpenAIResponseObjectStreamResponseWebSearchCallInProgress {
    /**
     * Unique identifier of the web search call
     */
    item_id: string;

    /**
     * Index position of the item in the output list
     */
    output_index: number;

    /**
     * Sequential number for ordering streaming events
     */
    sequence_number: number;

    /**
     * Event type identifier, always "response.web_search_call.in_progress"
     */
    type: 'response.web_search_call.in_progress';
  }

  export interface OpenAIResponseObjectStreamResponseWebSearchCallSearching {
    item_id: string;

    output_index: number;

    sequence_number: number;

    type: 'response.web_search_call.searching';
  }

  /**
   * Streaming event for completed web search calls.
   */
  export interface OpenAIResponseObjectStreamResponseWebSearchCallCompleted {
    /**
     * Unique identifier of the completed web search call
     */
    item_id: string;

    /**
     * Index position of the item in the output list
     */
    output_index: number;

    /**
     * Sequential number for ordering streaming events
     */
    sequence_number: number;

    /**
     * Event type identifier, always "response.web_search_call.completed"
     */
    type: 'response.web_search_call.completed';
  }

  export interface OpenAIResponseObjectStreamResponseMcpListToolsInProgress {
    sequence_number: number;

    type: 'response.mcp_list_tools.in_progress';
  }

  export interface OpenAIResponseObjectStreamResponseMcpListToolsFailed {
    sequence_number: number;

    type: 'response.mcp_list_tools.failed';
  }

  export interface OpenAIResponseObjectStreamResponseMcpListToolsCompleted {
    sequence_number: number;

    type: 'response.mcp_list_tools.completed';
  }

  export interface OpenAIResponseObjectStreamResponseMcpCallArgumentsDelta {
    delta: string;

    item_id: string;

    output_index: number;

    sequence_number: number;

    type: 'response.mcp_call.arguments.delta';
  }

  export interface OpenAIResponseObjectStreamResponseMcpCallArgumentsDone {
    arguments: string;

    item_id: string;

    output_index: number;

    sequence_number: number;

    type: 'response.mcp_call.arguments.done';
  }

  /**
   * Streaming event for MCP calls in progress.
   */
  export interface OpenAIResponseObjectStreamResponseMcpCallInProgress {
    /**
     * Unique identifier of the MCP call
     */
    item_id: string;

    /**
     * Index position of the item in the output list
     */
    output_index: number;

    /**
     * Sequential number for ordering streaming events
     */
    sequence_number: number;

    /**
     * Event type identifier, always "response.mcp_call.in_progress"
     */
    type: 'response.mcp_call.in_progress';
  }

  /**
   * Streaming event for failed MCP calls.
   */
  export interface OpenAIResponseObjectStreamResponseMcpCallFailed {
    /**
     * Sequential number for ordering streaming events
     */
    sequence_number: number;

    /**
     * Event type identifier, always "response.mcp_call.failed"
     */
    type: 'response.mcp_call.failed';
  }

  /**
   * Streaming event for completed MCP calls.
   */
  export interface OpenAIResponseObjectStreamResponseMcpCallCompleted {
    /**
     * Sequential number for ordering streaming events
     */
    sequence_number: number;

    /**
     * Event type identifier, always "response.mcp_call.completed"
     */
    type: 'response.mcp_call.completed';
  }

  /**
   * Streaming event for when a new content part is added to a response item.
   */
  export interface OpenAIResponseObjectStreamResponseContentPartAdded {
    /**
     * Unique identifier of the output item containing this content part
     */
    item_id: string;

    /**
     * The content part that was added
     */
    part:
      | OpenAIResponseObjectStreamResponseContentPartAdded.OpenAIResponseContentPartOutputText
      | OpenAIResponseObjectStreamResponseContentPartAdded.OpenAIResponseContentPartRefusal;

    /**
     * Unique identifier of the response containing this content
     */
    response_id: string;

    /**
     * Sequential number for ordering streaming events
     */
    sequence_number: number;

    /**
     * Event type identifier, always "response.content_part.added"
     */
    type: 'response.content_part.added';
  }

  export namespace OpenAIResponseObjectStreamResponseContentPartAdded {
    export interface OpenAIResponseContentPartOutputText {
      text: string;

      type: 'output_text';
    }

    export interface OpenAIResponseContentPartRefusal {
      refusal: string;

      type: 'refusal';
    }
  }

  /**
   * Streaming event for when a content part is completed.
   */
  export interface OpenAIResponseObjectStreamResponseContentPartDone {
    /**
     * Unique identifier of the output item containing this content part
     */
    item_id: string;

    /**
     * The completed content part
     */
    part:
      | OpenAIResponseObjectStreamResponseContentPartDone.OpenAIResponseContentPartOutputText
      | OpenAIResponseObjectStreamResponseContentPartDone.OpenAIResponseContentPartRefusal;

    /**
     * Unique identifier of the response containing this content
     */
    response_id: string;

    /**
     * Sequential number for ordering streaming events
     */
    sequence_number: number;

    /**
     * Event type identifier, always "response.content_part.done"
     */
    type: 'response.content_part.done';
  }

  export namespace OpenAIResponseObjectStreamResponseContentPartDone {
    export interface OpenAIResponseContentPartOutputText {
      text: string;

      type: 'output_text';
    }

    export interface OpenAIResponseContentPartRefusal {
      refusal: string;

      type: 'refusal';
    }
  }

  /**
   * Streaming event indicating a response has been completed.
   */
  export interface OpenAIResponseObjectStreamResponseCompleted {
    /**
     * The completed response object
     */
    response: ResponsesAPI.ResponseObject;

    /**
     * Event type identifier, always "response.completed"
     */
    type: 'response.completed';
  }
}

/**
 * OpenAI response object extended with input context information.
 */
export interface ResponseListResponse {
  /**
   * Unique identifier for this response
   */
  id: string;

  /**
   * Unix timestamp when the response was created
   */
  created_at: number;

  /**
   * List of input items that led to this response
   */
  input: Array<
    | ResponseListResponse.OpenAIResponseOutputMessageWebSearchToolCall
    | ResponseListResponse.OpenAIResponseOutputMessageFileSearchToolCall
    | ResponseListResponse.OpenAIResponseOutputMessageFunctionToolCall
    | ResponseListResponse.OpenAIResponseInputFunctionToolCallOutput
    | ResponseListResponse.OpenAIResponseMessage
  >;

  /**
   * Model identifier used for generation
   */
  model: string;

  /**
   * Object type identifier, always "response"
   */
  object: 'response';

  /**
   * List of generated output items (messages, tool calls, etc.)
   */
  output: Array<
    | ResponseListResponse.OpenAIResponseMessage
    | ResponseListResponse.OpenAIResponseOutputMessageWebSearchToolCall
    | ResponseListResponse.OpenAIResponseOutputMessageFileSearchToolCall
    | ResponseListResponse.OpenAIResponseOutputMessageFunctionToolCall
    | ResponseListResponse.OpenAIResponseOutputMessageMcpCall
    | ResponseListResponse.OpenAIResponseOutputMessageMcpListTools
  >;

  /**
   * Whether tool calls can be executed in parallel
   */
  parallel_tool_calls: boolean;

  /**
   * Current status of the response generation
   */
  status: string;

  /**
   * Text formatting configuration for the response
   */
  text: ResponseListResponse.Text;

  /**
   * (Optional) Error details if the response generation failed
   */
  error?: ResponseListResponse.Error;

  /**
   * (Optional) ID of the previous response in a conversation
   */
  previous_response_id?: string;

  /**
   * (Optional) Sampling temperature used for generation
   */
  temperature?: number;

  /**
   * (Optional) Nucleus sampling parameter used for generation
   */
  top_p?: number;

  /**
   * (Optional) Truncation strategy applied to the response
   */
  truncation?: string;

  /**
   * (Optional) User identifier associated with the request
   */
  user?: string;
}

export namespace ResponseListResponse {
  /**
   * Web search tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageWebSearchToolCall {
    /**
     * Unique identifier for this tool call
     */
    id: string;

    /**
     * Current status of the web search operation
     */
    status: string;

    /**
     * Tool call type identifier, always "web_search_call"
     */
    type: 'web_search_call';
  }

  /**
   * File search tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageFileSearchToolCall {
    /**
     * Unique identifier for this tool call
     */
    id: string;

    /**
     * List of search queries executed
     */
    queries: Array<string>;

    /**
     * Current status of the file search operation
     */
    status: string;

    /**
     * Tool call type identifier, always "file_search_call"
     */
    type: 'file_search_call';

    /**
     * (Optional) Search results returned by the file search operation
     */
    results?: Array<OpenAIResponseOutputMessageFileSearchToolCall.Result>;
  }

  export namespace OpenAIResponseOutputMessageFileSearchToolCall {
    /**
     * Search results returned by the file search operation.
     */
    export interface Result {
      /**
       * (Optional) Key-value attributes associated with the file
       */
      attributes: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

      /**
       * Unique identifier of the file containing the result
       */
      file_id: string;

      /**
       * Name of the file containing the result
       */
      filename: string;

      /**
       * Relevance score for this search result (between 0 and 1)
       */
      score: number;

      /**
       * Text content of the search result
       */
      text: string;
    }
  }

  /**
   * Function tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageFunctionToolCall {
    /**
     * JSON string containing the function arguments
     */
    arguments: string;

    /**
     * Unique identifier for the function call
     */
    call_id: string;

    /**
     * Name of the function being called
     */
    name: string;

    /**
     * Tool call type identifier, always "function_call"
     */
    type: 'function_call';

    /**
     * (Optional) Additional identifier for the tool call
     */
    id?: string;

    /**
     * (Optional) Current status of the function call execution
     */
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
    /**
     * Text content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentText {
      /**
       * The text content of the input message
       */
      text: string;

      /**
       * Content type identifier, always "input_text"
       */
      type: 'input_text';
    }

    /**
     * Image content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentImage {
      /**
       * Level of detail for image processing, can be "low", "high", or "auto"
       */
      detail: 'low' | 'high' | 'auto';

      /**
       * Content type identifier, always "input_image"
       */
      type: 'input_image';

      /**
       * (Optional) URL of the image content
       */
      image_url?: string;
    }

    export interface UnionMember2 {
      annotations: Array<
        | UnionMember2.OpenAIResponseAnnotationFileCitation
        | UnionMember2.OpenAIResponseAnnotationCitation
        | UnionMember2.OpenAIResponseAnnotationContainerFileCitation
        | UnionMember2.OpenAIResponseAnnotationFilePath
      >;

      text: string;

      type: 'output_text';
    }

    export namespace UnionMember2 {
      /**
       * File citation annotation for referencing specific files in response content.
       */
      export interface OpenAIResponseAnnotationFileCitation {
        /**
         * Unique identifier of the referenced file
         */
        file_id: string;

        /**
         * Name of the referenced file
         */
        filename: string;

        /**
         * Position index of the citation within the content
         */
        index: number;

        /**
         * Annotation type identifier, always "file_citation"
         */
        type: 'file_citation';
      }

      /**
       * URL citation annotation for referencing external web resources.
       */
      export interface OpenAIResponseAnnotationCitation {
        /**
         * End position of the citation span in the content
         */
        end_index: number;

        /**
         * Start position of the citation span in the content
         */
        start_index: number;

        /**
         * Title of the referenced web resource
         */
        title: string;

        /**
         * Annotation type identifier, always "url_citation"
         */
        type: 'url_citation';

        /**
         * URL of the referenced web resource
         */
        url: string;
      }

      export interface OpenAIResponseAnnotationContainerFileCitation {
        container_id: string;

        end_index: number;

        file_id: string;

        filename: string;

        start_index: number;

        type: 'container_file_citation';
      }

      export interface OpenAIResponseAnnotationFilePath {
        file_id: string;

        index: number;

        type: 'file_path';
      }
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
    /**
     * Text content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentText {
      /**
       * The text content of the input message
       */
      text: string;

      /**
       * Content type identifier, always "input_text"
       */
      type: 'input_text';
    }

    /**
     * Image content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentImage {
      /**
       * Level of detail for image processing, can be "low", "high", or "auto"
       */
      detail: 'low' | 'high' | 'auto';

      /**
       * Content type identifier, always "input_image"
       */
      type: 'input_image';

      /**
       * (Optional) URL of the image content
       */
      image_url?: string;
    }

    export interface UnionMember2 {
      annotations: Array<
        | UnionMember2.OpenAIResponseAnnotationFileCitation
        | UnionMember2.OpenAIResponseAnnotationCitation
        | UnionMember2.OpenAIResponseAnnotationContainerFileCitation
        | UnionMember2.OpenAIResponseAnnotationFilePath
      >;

      text: string;

      type: 'output_text';
    }

    export namespace UnionMember2 {
      /**
       * File citation annotation for referencing specific files in response content.
       */
      export interface OpenAIResponseAnnotationFileCitation {
        /**
         * Unique identifier of the referenced file
         */
        file_id: string;

        /**
         * Name of the referenced file
         */
        filename: string;

        /**
         * Position index of the citation within the content
         */
        index: number;

        /**
         * Annotation type identifier, always "file_citation"
         */
        type: 'file_citation';
      }

      /**
       * URL citation annotation for referencing external web resources.
       */
      export interface OpenAIResponseAnnotationCitation {
        /**
         * End position of the citation span in the content
         */
        end_index: number;

        /**
         * Start position of the citation span in the content
         */
        start_index: number;

        /**
         * Title of the referenced web resource
         */
        title: string;

        /**
         * Annotation type identifier, always "url_citation"
         */
        type: 'url_citation';

        /**
         * URL of the referenced web resource
         */
        url: string;
      }

      export interface OpenAIResponseAnnotationContainerFileCitation {
        container_id: string;

        end_index: number;

        file_id: string;

        filename: string;

        start_index: number;

        type: 'container_file_citation';
      }

      export interface OpenAIResponseAnnotationFilePath {
        file_id: string;

        index: number;

        type: 'file_path';
      }
    }
  }

  /**
   * Web search tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageWebSearchToolCall {
    /**
     * Unique identifier for this tool call
     */
    id: string;

    /**
     * Current status of the web search operation
     */
    status: string;

    /**
     * Tool call type identifier, always "web_search_call"
     */
    type: 'web_search_call';
  }

  /**
   * File search tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageFileSearchToolCall {
    /**
     * Unique identifier for this tool call
     */
    id: string;

    /**
     * List of search queries executed
     */
    queries: Array<string>;

    /**
     * Current status of the file search operation
     */
    status: string;

    /**
     * Tool call type identifier, always "file_search_call"
     */
    type: 'file_search_call';

    /**
     * (Optional) Search results returned by the file search operation
     */
    results?: Array<OpenAIResponseOutputMessageFileSearchToolCall.Result>;
  }

  export namespace OpenAIResponseOutputMessageFileSearchToolCall {
    /**
     * Search results returned by the file search operation.
     */
    export interface Result {
      /**
       * (Optional) Key-value attributes associated with the file
       */
      attributes: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

      /**
       * Unique identifier of the file containing the result
       */
      file_id: string;

      /**
       * Name of the file containing the result
       */
      filename: string;

      /**
       * Relevance score for this search result (between 0 and 1)
       */
      score: number;

      /**
       * Text content of the search result
       */
      text: string;
    }
  }

  /**
   * Function tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageFunctionToolCall {
    /**
     * JSON string containing the function arguments
     */
    arguments: string;

    /**
     * Unique identifier for the function call
     */
    call_id: string;

    /**
     * Name of the function being called
     */
    name: string;

    /**
     * Tool call type identifier, always "function_call"
     */
    type: 'function_call';

    /**
     * (Optional) Additional identifier for the tool call
     */
    id?: string;

    /**
     * (Optional) Current status of the function call execution
     */
    status?: string;
  }

  /**
   * Model Context Protocol (MCP) call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageMcpCall {
    /**
     * Unique identifier for this MCP call
     */
    id: string;

    /**
     * JSON string containing the MCP call arguments
     */
    arguments: string;

    /**
     * Name of the MCP method being called
     */
    name: string;

    /**
     * Label identifying the MCP server handling the call
     */
    server_label: string;

    /**
     * Tool call type identifier, always "mcp_call"
     */
    type: 'mcp_call';

    /**
     * (Optional) Error message if the MCP call failed
     */
    error?: string;

    /**
     * (Optional) Output result from the successful MCP call
     */
    output?: string;
  }

  /**
   * MCP list tools output message containing available tools from an MCP server.
   */
  export interface OpenAIResponseOutputMessageMcpListTools {
    /**
     * Unique identifier for this MCP list tools operation
     */
    id: string;

    /**
     * Label identifying the MCP server providing the tools
     */
    server_label: string;

    /**
     * List of available tools provided by the MCP server
     */
    tools: Array<OpenAIResponseOutputMessageMcpListTools.Tool>;

    /**
     * Tool call type identifier, always "mcp_list_tools"
     */
    type: 'mcp_list_tools';
  }

  export namespace OpenAIResponseOutputMessageMcpListTools {
    /**
     * Tool definition returned by MCP list tools operation.
     */
    export interface Tool {
      /**
       * JSON schema defining the tool's input parameters
       */
      input_schema: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

      /**
       * Name of the tool
       */
      name: string;

      /**
       * (Optional) Description of what the tool does
       */
      description?: string;
    }
  }

  /**
   * Text formatting configuration for the response
   */
  export interface Text {
    /**
     * (Optional) Text format configuration specifying output format requirements
     */
    format?: Text.Format;
  }

  export namespace Text {
    /**
     * (Optional) Text format configuration specifying output format requirements
     */
    export interface Format {
      /**
       * Must be "text", "json_schema", or "json_object" to identify the format type
       */
      type: 'text' | 'json_schema' | 'json_object';

      /**
       * (Optional) A description of the response format. Only used for json_schema.
       */
      description?: string;

      /**
       * The name of the response format. Only used for json_schema.
       */
      name?: string;

      /**
       * The JSON schema the response should conform to. In a Python SDK, this is often a
       * `pydantic` model. Only used for json_schema.
       */
      schema?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

      /**
       * (Optional) Whether to strictly enforce the JSON schema. If true, the response
       * must match the schema exactly. Only used for json_schema.
       */
      strict?: boolean;
    }
  }

  /**
   * (Optional) Error details if the response generation failed
   */
  export interface Error {
    /**
     * Error code identifying the type of failure
     */
    code: string;

    /**
     * Human-readable error message describing the failure
     */
    message: string;
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
        | ResponseCreateParams.OpenAIResponseOutputMessageFileSearchToolCall
        | ResponseCreateParams.OpenAIResponseOutputMessageFunctionToolCall
        | ResponseCreateParams.OpenAIResponseInputFunctionToolCallOutput
        | ResponseCreateParams.OpenAIResponseMessage
      >;

  /**
   * The underlying LLM used for completions.
   */
  model: string;

  /**
   * (Optional) Additional fields to include in the response.
   */
  include?: Array<string>;

  instructions?: string;

  max_infer_iters?: number;

  /**
   * (Optional) if specified, the new response will be a continuation of the previous
   * response. This can be used to easily fork-off new responses from existing
   * responses.
   */
  previous_response_id?: string;

  store?: boolean;

  stream?: boolean;

  temperature?: number;

  /**
   * Text response configuration for OpenAI responses.
   */
  text?: ResponseCreateParams.Text;

  tools?: Array<
    | ResponseCreateParams.OpenAIResponseInputToolWebSearch
    | ResponseCreateParams.OpenAIResponseInputToolFileSearch
    | ResponseCreateParams.OpenAIResponseInputToolFunction
    | ResponseCreateParams.OpenAIResponseInputToolMcp
  >;
}

export namespace ResponseCreateParams {
  /**
   * Web search tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageWebSearchToolCall {
    /**
     * Unique identifier for this tool call
     */
    id: string;

    /**
     * Current status of the web search operation
     */
    status: string;

    /**
     * Tool call type identifier, always "web_search_call"
     */
    type: 'web_search_call';
  }

  /**
   * File search tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageFileSearchToolCall {
    /**
     * Unique identifier for this tool call
     */
    id: string;

    /**
     * List of search queries executed
     */
    queries: Array<string>;

    /**
     * Current status of the file search operation
     */
    status: string;

    /**
     * Tool call type identifier, always "file_search_call"
     */
    type: 'file_search_call';

    /**
     * (Optional) Search results returned by the file search operation
     */
    results?: Array<OpenAIResponseOutputMessageFileSearchToolCall.Result>;
  }

  export namespace OpenAIResponseOutputMessageFileSearchToolCall {
    /**
     * Search results returned by the file search operation.
     */
    export interface Result {
      /**
       * (Optional) Key-value attributes associated with the file
       */
      attributes: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

      /**
       * Unique identifier of the file containing the result
       */
      file_id: string;

      /**
       * Name of the file containing the result
       */
      filename: string;

      /**
       * Relevance score for this search result (between 0 and 1)
       */
      score: number;

      /**
       * Text content of the search result
       */
      text: string;
    }
  }

  /**
   * Function tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageFunctionToolCall {
    /**
     * JSON string containing the function arguments
     */
    arguments: string;

    /**
     * Unique identifier for the function call
     */
    call_id: string;

    /**
     * Name of the function being called
     */
    name: string;

    /**
     * Tool call type identifier, always "function_call"
     */
    type: 'function_call';

    /**
     * (Optional) Additional identifier for the tool call
     */
    id?: string;

    /**
     * (Optional) Current status of the function call execution
     */
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
    /**
     * Text content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentText {
      /**
       * The text content of the input message
       */
      text: string;

      /**
       * Content type identifier, always "input_text"
       */
      type: 'input_text';
    }

    /**
     * Image content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentImage {
      /**
       * Level of detail for image processing, can be "low", "high", or "auto"
       */
      detail: 'low' | 'high' | 'auto';

      /**
       * Content type identifier, always "input_image"
       */
      type: 'input_image';

      /**
       * (Optional) URL of the image content
       */
      image_url?: string;
    }

    export interface UnionMember2 {
      annotations: Array<
        | UnionMember2.OpenAIResponseAnnotationFileCitation
        | UnionMember2.OpenAIResponseAnnotationCitation
        | UnionMember2.OpenAIResponseAnnotationContainerFileCitation
        | UnionMember2.OpenAIResponseAnnotationFilePath
      >;

      text: string;

      type: 'output_text';
    }

    export namespace UnionMember2 {
      /**
       * File citation annotation for referencing specific files in response content.
       */
      export interface OpenAIResponseAnnotationFileCitation {
        /**
         * Unique identifier of the referenced file
         */
        file_id: string;

        /**
         * Name of the referenced file
         */
        filename: string;

        /**
         * Position index of the citation within the content
         */
        index: number;

        /**
         * Annotation type identifier, always "file_citation"
         */
        type: 'file_citation';
      }

      /**
       * URL citation annotation for referencing external web resources.
       */
      export interface OpenAIResponseAnnotationCitation {
        /**
         * End position of the citation span in the content
         */
        end_index: number;

        /**
         * Start position of the citation span in the content
         */
        start_index: number;

        /**
         * Title of the referenced web resource
         */
        title: string;

        /**
         * Annotation type identifier, always "url_citation"
         */
        type: 'url_citation';

        /**
         * URL of the referenced web resource
         */
        url: string;
      }

      export interface OpenAIResponseAnnotationContainerFileCitation {
        container_id: string;

        end_index: number;

        file_id: string;

        filename: string;

        start_index: number;

        type: 'container_file_citation';
      }

      export interface OpenAIResponseAnnotationFilePath {
        file_id: string;

        index: number;

        type: 'file_path';
      }
    }
  }

  /**
   * Text response configuration for OpenAI responses.
   */
  export interface Text {
    /**
     * (Optional) Text format configuration specifying output format requirements
     */
    format?: Text.Format;
  }

  export namespace Text {
    /**
     * (Optional) Text format configuration specifying output format requirements
     */
    export interface Format {
      /**
       * Must be "text", "json_schema", or "json_object" to identify the format type
       */
      type: 'text' | 'json_schema' | 'json_object';

      /**
       * (Optional) A description of the response format. Only used for json_schema.
       */
      description?: string;

      /**
       * The name of the response format. Only used for json_schema.
       */
      name?: string;

      /**
       * The JSON schema the response should conform to. In a Python SDK, this is often a
       * `pydantic` model. Only used for json_schema.
       */
      schema?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

      /**
       * (Optional) Whether to strictly enforce the JSON schema. If true, the response
       * must match the schema exactly. Only used for json_schema.
       */
      strict?: boolean;
    }
  }

  /**
   * Web search tool configuration for OpenAI response inputs.
   */
  export interface OpenAIResponseInputToolWebSearch {
    /**
     * Web search tool type variant to use
     */
    type: 'web_search' | 'web_search_preview' | 'web_search_preview_2025_03_11';

    /**
     * (Optional) Size of search context, must be "low", "medium", or "high"
     */
    search_context_size?: string;
  }

  /**
   * File search tool configuration for OpenAI response inputs.
   */
  export interface OpenAIResponseInputToolFileSearch {
    /**
     * Tool type identifier, always "file_search"
     */
    type: 'file_search';

    /**
     * List of vector store identifiers to search within
     */
    vector_store_ids: Array<string>;

    /**
     * (Optional) Additional filters to apply to the search
     */
    filters?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

    /**
     * (Optional) Maximum number of search results to return (1-50)
     */
    max_num_results?: number;

    /**
     * (Optional) Options for ranking and scoring search results
     */
    ranking_options?: OpenAIResponseInputToolFileSearch.RankingOptions;
  }

  export namespace OpenAIResponseInputToolFileSearch {
    /**
     * (Optional) Options for ranking and scoring search results
     */
    export interface RankingOptions {
      /**
       * (Optional) Name of the ranking algorithm to use
       */
      ranker?: string;

      /**
       * (Optional) Minimum relevance score threshold for results
       */
      score_threshold?: number;
    }
  }

  /**
   * Function tool configuration for OpenAI response inputs.
   */
  export interface OpenAIResponseInputToolFunction {
    /**
     * Name of the function that can be called
     */
    name: string;

    /**
     * Tool type identifier, always "function"
     */
    type: 'function';

    /**
     * (Optional) Description of what the function does
     */
    description?: string;

    /**
     * (Optional) JSON schema defining the function's parameters
     */
    parameters?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

    /**
     * (Optional) Whether to enforce strict parameter validation
     */
    strict?: boolean;
  }

  /**
   * Model Context Protocol (MCP) tool configuration for OpenAI response inputs.
   */
  export interface OpenAIResponseInputToolMcp {
    /**
     * Approval requirement for tool calls ("always", "never", or filter)
     */
    require_approval: 'always' | 'never' | OpenAIResponseInputToolMcp.ApprovalFilter;

    /**
     * Label to identify this MCP server
     */
    server_label: string;

    /**
     * URL endpoint of the MCP server
     */
    server_url: string;

    /**
     * Tool type identifier, always "mcp"
     */
    type: 'mcp';

    /**
     * (Optional) Restriction on which tools can be used from this server
     */
    allowed_tools?: Array<string> | OpenAIResponseInputToolMcp.AllowedToolsFilter;

    /**
     * (Optional) HTTP headers to include when connecting to the server
     */
    headers?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };
  }

  export namespace OpenAIResponseInputToolMcp {
    /**
     * Filter configuration for MCP tool approval requirements.
     */
    export interface ApprovalFilter {
      /**
       * (Optional) List of tool names that always require approval
       */
      always?: Array<string>;

      /**
       * (Optional) List of tool names that never require approval
       */
      never?: Array<string>;
    }

    /**
     * Filter configuration for restricting which MCP tools can be used.
     */
    export interface AllowedToolsFilter {
      /**
       * (Optional) List of specific tool names that are allowed
       */
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

export interface ResponseListParams extends OpenAICursorPageParams {
  /**
   * The model to filter responses by.
   */
  model?: string;

  /**
   * The order to sort responses by when sorted by created_at ('asc' or 'desc').
   */
  order?: 'asc' | 'desc';
}

Responses.ResponseListResponsesOpenAICursorPage = ResponseListResponsesOpenAICursorPage;
Responses.InputItems = InputItems;

export declare namespace Responses {
  export {
    type ResponseObject as ResponseObject,
    type ResponseObjectStream as ResponseObjectStream,
    type ResponseListResponse as ResponseListResponse,
    ResponseListResponsesOpenAICursorPage as ResponseListResponsesOpenAICursorPage,
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
