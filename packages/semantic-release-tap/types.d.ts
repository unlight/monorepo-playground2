import {
  Config as SemanticReleaseConfig,
  Context as SemanticReleaseContext,
  Result as SemanticReleaseResult,
} from 'semantic-release';

export interface Context
  extends SemanticReleaseContext,
    SemanticReleaseConfig,
    SemanticReleaseResult {}

export interface Config {}

export interface SemanticReleaseError {
  message: string;
  details: string;
}
