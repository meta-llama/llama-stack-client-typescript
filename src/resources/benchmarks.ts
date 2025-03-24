// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Benchmarks extends APIResource {
  retrieve(benchmarkId: string, options?: Core.RequestOptions): Core.APIPromise<Benchmark> {
    return this._client.get(`/v1/eval/benchmarks/${benchmarkId}`, options);
  }

  list(options?: Core.RequestOptions): Core.APIPromise<BenchmarkListResponse> {
    return (
      this._client.get('/v1/eval/benchmarks', options) as Core.APIPromise<{ data: BenchmarkListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  register(body: BenchmarkRegisterParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post('/v1/eval/benchmarks', {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface Benchmark {
  dataset_id: string;

  identifier: string;

  metadata: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

  provider_id: string;

  provider_resource_id: string;

  scoring_functions: Array<string>;

  type: 'benchmark';
}

export interface ListBenchmarksResponse {
  data: BenchmarkListResponse;
}

export type BenchmarkListResponse = Array<Benchmark>;

export interface BenchmarkRegisterParams {
  benchmark_id: string;

  dataset_id: string;

  scoring_functions: Array<string>;

  metadata?: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

  provider_benchmark_id?: string;

  provider_id?: string;
}

export declare namespace Benchmarks {
  export {
    type Benchmark as Benchmark,
    type ListBenchmarksResponse as ListBenchmarksResponse,
    type BenchmarkListResponse as BenchmarkListResponse,
    type BenchmarkRegisterParams as BenchmarkRegisterParams,
  };
}
