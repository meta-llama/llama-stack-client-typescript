// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as ScoringFunctionsAPI from './scoring-functions';
import * as Shared from './shared';

export class Scoring extends APIResource {
  /**
   * Score a list of rows.
   */
  score(body: ScoringScoreParams, options?: Core.RequestOptions): Core.APIPromise<ScoringScoreResponse> {
    return this._client.post('/v1/scoring/score', { body, ...options });
  }

  scoreBatch(
    body: ScoringScoreBatchParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ScoringScoreBatchResponse> {
    return this._client.post('/v1/scoring/score-batch', { body, ...options });
  }
}

/**
 * The response from scoring.
 */
export interface ScoringScoreResponse {
  /**
   * A map of scoring function name to ScoringResult.
   */
  results: Record<string, Shared.ScoringResult>;
}

export interface ScoringScoreBatchResponse {
  results: Record<string, Shared.ScoringResult>;

  dataset_id?: string;
}

export interface ScoringScoreParams {
  /**
   * The rows to score.
   */
  input_rows: Array<Record<string, boolean | number | string | Array<unknown> | unknown | null>>;

  /**
   * The scoring functions to use for the scoring.
   */
  scoring_functions: Record<string, ScoringFunctionsAPI.ScoringFnParams | null>;
}

export interface ScoringScoreBatchParams {
  dataset_id: string;

  save_results_dataset: boolean;

  scoring_functions: Record<string, ScoringFunctionsAPI.ScoringFnParams | null>;
}

export declare namespace Scoring {
  export {
    type ScoringScoreResponse as ScoringScoreResponse,
    type ScoringScoreBatchResponse as ScoringScoreBatchResponse,
    type ScoringScoreParams as ScoringScoreParams,
    type ScoringScoreBatchParams as ScoringScoreBatchParams,
  };
}
