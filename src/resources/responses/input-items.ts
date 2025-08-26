// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';

export class InputItems extends APIResource {
  /**
   * List input items for a given OpenAI response.
   */
  list(
    responseId: string,
    query?: InputItemListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<InputItemListResponse>;
  list(responseId: string, options?: Core.RequestOptions): Core.APIPromise<InputItemListResponse>;
  list(
    responseId: string,
    query: InputItemListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<InputItemListResponse> {
    if (isRequestOptions(query)) {
      return this.list(responseId, {}, query);
    }
    return this._client.get(`/v1/openai/v1/responses/${responseId}/input_items`, { query, ...options });
  }
}

/**
 * List container for OpenAI response input items.
 */
export interface InputItemListResponse {
  /**
   * List of input items
   */
  data: Array<
    | InputItemListResponse.OpenAIResponseOutputMessageWebSearchToolCall
    | InputItemListResponse.OpenAIResponseOutputMessageFileSearchToolCall
    | InputItemListResponse.OpenAIResponseOutputMessageFunctionToolCall
    | InputItemListResponse.OpenAIResponseInputFunctionToolCallOutput
    | InputItemListResponse.OpenAIResponseMessage
  >;

  /**
   * Object type identifier, always "list"
   */
  object: 'list';
}

export namespace InputItemListResponse {
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
}

export interface InputItemListParams {
  /**
   * An item ID to list items after, used for pagination.
   */
  after?: string;

  /**
   * An item ID to list items before, used for pagination.
   */
  before?: string;

  /**
   * Additional fields to include in the response.
   */
  include?: Array<string>;

  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and
   * 100, and the default is 20.
   */
  limit?: number;

  /**
   * The order to return the input items in. Default is desc.
   */
  order?: 'asc' | 'desc';
}

export declare namespace InputItems {
  export {
    type InputItemListResponse as InputItemListResponse,
    type InputItemListParams as InputItemListParams,
  };
}
