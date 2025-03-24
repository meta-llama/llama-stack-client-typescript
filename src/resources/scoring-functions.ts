// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

export class ScoringFunctions extends APIResource {
  retrieve(scoringFnId: string, options?: Core.RequestOptions): Core.APIPromise<ScoringFn> {
    return this._client.get(`/v1/scoring-functions/${scoringFnId}`, options);
  }

  list(options?: Core.RequestOptions): Core.APIPromise<ScoringFunctionListResponse> {
    return (
      this._client.get('/v1/scoring-functions', options) as Core.APIPromise<{
        data: ScoringFunctionListResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  register(body: ScoringFunctionRegisterParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post('/v1/scoring-functions', {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface ListScoringFunctionsResponse {
  data: ScoringFunctionListResponse;
}

export interface ScoringFn {
  identifier: string;

  metadata: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

  provider_id: string;

  provider_resource_id: string;

  return_type: Shared.ReturnType;

  type: 'scoring_function';

  description?: string;

  params?: ScoringFnParams;
}

export type ScoringFnParams =
  | ScoringFnParams.LlmAsJudgeScoringFnParams
  | ScoringFnParams.RegexParserScoringFnParams
  | ScoringFnParams.BasicScoringFnParams;

export namespace ScoringFnParams {
  export interface LlmAsJudgeScoringFnParams {
    judge_model: string;

    type: 'llm_as_judge';

    aggregation_functions?: Array<
      'average' | 'weighted_average' | 'median' | 'categorical_count' | 'accuracy'
    >;

    judge_score_regexes?: Array<string>;

    prompt_template?: string;
  }

  export interface RegexParserScoringFnParams {
    type: 'regex_parser';

    aggregation_functions?: Array<
      'average' | 'weighted_average' | 'median' | 'categorical_count' | 'accuracy'
    >;

    parsing_regexes?: Array<string>;
  }

  export interface BasicScoringFnParams {
    type: 'basic';

    aggregation_functions?: Array<
      'average' | 'weighted_average' | 'median' | 'categorical_count' | 'accuracy'
    >;
  }
}

export type ScoringFunctionListResponse = Array<ScoringFn>;

export interface ScoringFunctionRegisterParams {
  description: string;

  return_type: Shared.ReturnType;

  scoring_fn_id: string;

  params?: ScoringFnParams;

  provider_id?: string;

  provider_scoring_fn_id?: string;
}

export declare namespace ScoringFunctions {
  export {
    type ListScoringFunctionsResponse as ListScoringFunctionsResponse,
    type ScoringFn as ScoringFn,
    type ScoringFnParams as ScoringFnParams,
    type ScoringFunctionListResponse as ScoringFunctionListResponse,
    type ScoringFunctionRegisterParams as ScoringFunctionRegisterParams,
  };
}
