// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Datasetio extends APIResource {
  appendRows(body: DatasetioAppendRowsParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post('/v1/datasetio/rows', {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Get a paginated list of rows from a dataset.
   */
  getRowsPaginated(
    query: DatasetioGetRowsPaginatedParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PaginatedRowsResult> {
    return this._client.get('/v1/datasetio/rows', { query, ...options });
  }
}

/**
 * A paginated list of rows from a dataset.
 */
export interface PaginatedRowsResult {
  /**
   * The rows in the current page.
   */
  rows: Array<Record<string, boolean | number | string | Array<unknown> | unknown | null>>;

  /**
   * The total number of rows in the dataset.
   */
  total_count: number;

  /**
   * The token to get the next page of rows.
   */
  next_page_token?: string;
}

export interface DatasetioAppendRowsParams {
  dataset_id: string;

  rows: Array<Record<string, boolean | number | string | Array<unknown> | unknown | null>>;
}

export interface DatasetioGetRowsPaginatedParams {
  /**
   * The ID of the dataset to get the rows from.
   */
  dataset_id: string;

  /**
   * The number of rows to get per page.
   */
  rows_in_page: number;

  /**
   * (Optional) A condition to filter the rows by.
   */
  filter_condition?: string;

  /**
   * The token to get the next page of rows.
   */
  page_token?: string;
}

export declare namespace Datasetio {
  export {
    type PaginatedRowsResult as PaginatedRowsResult,
    type DatasetioAppendRowsParams as DatasetioAppendRowsParams,
    type DatasetioGetRowsPaginatedParams as DatasetioGetRowsPaginatedParams,
  };
}
