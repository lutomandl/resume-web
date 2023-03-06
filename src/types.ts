import { APIError } from 'graphql-hooks';
import { DataQuery } from './graphql/schema';

export interface GraphQlError {
  message: string;
  [index: string]: unknown;
}

export interface StrapiContentContext {
  data: DataQuery | null;
  error: APIError<GraphQlError> | null;
  loading: boolean;
}
