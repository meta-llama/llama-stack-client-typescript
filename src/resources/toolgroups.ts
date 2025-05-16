// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Toolgroups extends APIResource {
  /**
   * List tool groups with optional provider
   */
  list(options?: Core.RequestOptions): Core.APIPromise<ToolgroupListResponse> {
    return (
      this._client.get('/v1/toolgroups', options) as Core.APIPromise<{ data: ToolgroupListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  get(toolgroupId: string, options?: Core.RequestOptions): Core.APIPromise<ToolGroup> {
    return this._client.get(`/v1/toolgroups/${toolgroupId}`, options);
  }

  /**
   * Register a tool group
   */
  register(body: ToolgroupRegisterParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post('/v1/toolgroups', {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Unregister a tool group
   */
  unregister(toolgroupId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v1/toolgroups/${toolgroupId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface ListToolGroupsResponse {
  data: ToolgroupListResponse;
}

export interface ToolGroup {
  identifier: string;

  provider_id: string;

  type: 'tool_group';

  args?: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

  mcp_endpoint?: ToolGroup.McpEndpoint;

  provider_resource_id?: string;
}

export namespace ToolGroup {
  export interface McpEndpoint {
    uri: string;
  }
}

export type ToolgroupListResponse = Array<ToolGroup>;

export interface ToolgroupRegisterParams {
  provider_id: string;

  toolgroup_id: string;

  args?: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

  mcp_endpoint?: ToolgroupRegisterParams.McpEndpoint;
}

export namespace ToolgroupRegisterParams {
  export interface McpEndpoint {
    uri: string;
  }
}

export declare namespace Toolgroups {
  export {
    type ListToolGroupsResponse as ListToolGroupsResponse,
    type ToolGroup as ToolGroup,
    type ToolgroupListResponse as ToolgroupListResponse,
    type ToolgroupRegisterParams as ToolgroupRegisterParams,
  };
}
