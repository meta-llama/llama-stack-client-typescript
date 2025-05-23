// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

export class VectorIo extends APIResource {
  /**
   * Insert chunks into a vector database.
   */
  insert(body: VectorIoInsertParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post('/v1/vector-io/insert', {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Query chunks from a vector database.
   */
  query(body: VectorIoQueryParams, options?: Core.RequestOptions): Core.APIPromise<QueryChunksResponse> {
    return this._client.post('/v1/vector-io/query', { body, ...options });
  }
}

export interface QueryChunksResponse {
  chunks: Array<QueryChunksResponse.Chunk>;

  scores: Array<number>;
}

export namespace QueryChunksResponse {
  export interface Chunk {
    /**
     * A image content item
     */
    content: Shared.InterleavedContent;

    metadata: Record<string, boolean | number | string | Array<unknown> | unknown | null>;
  }
}

export interface VectorIoInsertParams {
  /**
   * The chunks to insert.
   */
  chunks: Array<VectorIoInsertParams.Chunk>;

  /**
   * The identifier of the vector database to insert the chunks into.
   */
  vector_db_id: string;

  /**
   * The time to live of the chunks.
   */
  ttl_seconds?: number;
}

export namespace VectorIoInsertParams {
  export interface Chunk {
    /**
     * A image content item
     */
    content: Shared.InterleavedContent;

    metadata: Record<string, boolean | number | string | Array<unknown> | unknown | null>;
  }
}

export interface VectorIoQueryParams {
  /**
   * The query to search for.
   */
  query: Shared.InterleavedContent;

  /**
   * The identifier of the vector database to query.
   */
  vector_db_id: string;

  /**
   * The parameters of the query.
   */
  params?: Record<string, boolean | number | string | Array<unknown> | unknown | null>;
}

export declare namespace VectorIo {
  export {
    type QueryChunksResponse as QueryChunksResponse,
    type VectorIoInsertParams as VectorIoInsertParams,
    type VectorIoQueryParams as VectorIoQueryParams,
  };
}
