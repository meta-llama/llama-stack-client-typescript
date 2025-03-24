// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as Shared from '../shared';
import * as RagToolAPI from './rag-tool';
import { RagTool, RagToolInsertParams, RagToolQueryParams } from './rag-tool';
import { JSONLDecoder } from '../../internal/decoders/jsonl';

export class ToolRuntime extends APIResource {
  ragTool: RagToolAPI.RagTool = new RagToolAPI.RagTool(this._client);

  /**
   * Run a tool with the given arguments
   */
  invokeTool(
    body: ToolRuntimeInvokeToolParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ToolInvocationResult> {
    return this._client.post('/v1/tool-runtime/invoke', { body, ...options });
  }

  listTools(
    query?: ToolRuntimeListToolsParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<JSONLDecoder<ToolDef>>;
  listTools(options?: Core.RequestOptions): Core.APIPromise<JSONLDecoder<ToolDef>>;
  listTools(
    query: ToolRuntimeListToolsParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<JSONLDecoder<ToolDef>> {
    if (isRequestOptions(query)) {
      return this.listTools({}, query);
    }
    return this._client
      .get('/v1/tool-runtime/list-tools', {
        query,
        ...options,
        headers: { Accept: 'application/jsonl', ...options?.headers },
        __binaryResponse: true,
      })
      ._thenUnwrap((_, props) => JSONLDecoder.fromResponse(props.response, props.controller));
  }
}

export interface ToolDef {
  name: string;

  description?: string;

  metadata?: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

  parameters?: Array<ToolDef.Parameter>;
}

export namespace ToolDef {
  export interface Parameter {
    description: string;

    name: string;

    parameter_type: string;

    required: boolean;

    default?: boolean | number | string | Array<unknown> | unknown | null;
  }
}

export interface ToolInvocationResult {
  /**
   * A image content item
   */
  content?: Shared.InterleavedContent;

  error_code?: number;

  error_message?: string;

  metadata?: Record<string, boolean | number | string | Array<unknown> | unknown | null>;
}

export interface ToolRuntimeInvokeToolParams {
  kwargs: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

  tool_name: string;
}

export interface ToolRuntimeListToolsParams {
  mcp_endpoint?: ToolRuntimeListToolsParams.McpEndpoint;

  tool_group_id?: string;
}

export namespace ToolRuntimeListToolsParams {
  export interface McpEndpoint {
    uri: string;
  }
}

ToolRuntime.RagTool = RagTool;

export declare namespace ToolRuntime {
  export {
    type ToolDef as ToolDef,
    type ToolInvocationResult as ToolInvocationResult,
    type ToolRuntimeInvokeToolParams as ToolRuntimeInvokeToolParams,
    type ToolRuntimeListToolsParams as ToolRuntimeListToolsParams,
  };

  export {
    RagTool as RagTool,
    type RagToolInsertParams as RagToolInsertParams,
    type RagToolQueryParams as RagToolQueryParams,
  };
}
