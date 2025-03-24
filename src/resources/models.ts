// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Models extends APIResource {
  retrieve(modelId: string, options?: Core.RequestOptions): Core.APIPromise<Model> {
    return this._client.get(`/v1/models/${modelId}`, options);
  }

  list(options?: Core.RequestOptions): Core.APIPromise<ModelListResponse> {
    return (
      this._client.get('/v1/models', options) as Core.APIPromise<{ data: ModelListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  register(body: ModelRegisterParams, options?: Core.RequestOptions): Core.APIPromise<Model> {
    return this._client.post('/v1/models', { body, ...options });
  }

  unregister(modelId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v1/models/${modelId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface ListModelsResponse {
  data: ModelListResponse;
}

export interface Model {
  identifier: string;

  metadata: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

  model_type: 'llm' | 'embedding';

  provider_id: string;

  provider_resource_id: string;

  type: 'model';
}

export type ModelListResponse = Array<Model>;

export interface ModelRegisterParams {
  model_id: string;

  metadata?: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

  model_type?: 'llm' | 'embedding';

  provider_id?: string;

  provider_model_id?: string;
}

export declare namespace Models {
  export {
    type ListModelsResponse as ListModelsResponse,
    type Model as Model,
    type ModelListResponse as ModelListResponse,
    type ModelRegisterParams as ModelRegisterParams,
  };
}
