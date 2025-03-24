// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class VectorDBs extends APIResource {
  retrieve(vectorDBId: string, options?: Core.RequestOptions): Core.APIPromise<VectorDBRetrieveResponse> {
    return this._client.get(`/v1/vector-dbs/${vectorDBId}`, options);
  }

  list(options?: Core.RequestOptions): Core.APIPromise<VectorDBListResponse> {
    return (
      this._client.get('/v1/vector-dbs', options) as Core.APIPromise<{ data: VectorDBListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  register(
    body: VectorDBRegisterParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VectorDBRegisterResponse> {
    return this._client.post('/v1/vector-dbs', { body, ...options });
  }

  unregister(vectorDBId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v1/vector-dbs/${vectorDBId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface ListVectorDBsResponse {
  data: VectorDBListResponse;
}

export interface VectorDBRetrieveResponse {
  embedding_dimension: number;

  embedding_model: string;

  identifier: string;

  provider_id: string;

  provider_resource_id: string;

  type: 'vector_db';
}

export type VectorDBListResponse = Array<VectorDBListResponse.VectorDBListResponseItem>;

export namespace VectorDBListResponse {
  export interface VectorDBListResponseItem {
    embedding_dimension: number;

    embedding_model: string;

    identifier: string;

    provider_id: string;

    provider_resource_id: string;

    type: 'vector_db';
  }
}

export interface VectorDBRegisterResponse {
  embedding_dimension: number;

  embedding_model: string;

  identifier: string;

  provider_id: string;

  provider_resource_id: string;

  type: 'vector_db';
}

export interface VectorDBRegisterParams {
  embedding_model: string;

  vector_db_id: string;

  embedding_dimension?: number;

  provider_id?: string;

  provider_vector_db_id?: string;
}

export declare namespace VectorDBs {
  export {
    type ListVectorDBsResponse as ListVectorDBsResponse,
    type VectorDBRetrieveResponse as VectorDBRetrieveResponse,
    type VectorDBListResponse as VectorDBListResponse,
    type VectorDBRegisterResponse as VectorDBRegisterResponse,
    type VectorDBRegisterParams as VectorDBRegisterParams,
  };
}
