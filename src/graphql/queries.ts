// DO NOT EDIT!
// THIS FILE IS GENERATED WITH GRAPH GL CODEGEN.

import {
  useMutation,
  useQuery,
  useManualQuery,
  UseQueryOptions,
  UseClientRequestOptions,
  APIError,
} from 'graphql-hooks';

import * as GQL from './schema';

// Home
export const HomeQueryString = `query Home {
  home {
    data {
      attributes {
        name
        title
        location
      }
    }
  }
}
`;
export type Home_Query_type = typeof HomeQueryString;
export function useHome(
  options?: UseQueryOptions<GQL.HomeQuery, GQL.HomeQueryVariables>
) {
  return useQuery<GQL.HomeQuery, GQL.HomeQueryVariables, APIError>(
    HomeQueryString,
    { ...options, operationName: 'Home' }
  );
}
export function useManualHome(
  options?: UseClientRequestOptions<GQL.HomeQuery, GQL.HomeQueryVariables>
) {
  return useManualQuery<GQL.HomeQuery, GQL.HomeQueryVariables, APIError>(
    HomeQueryString,
    { ...options, operationName: 'Home' }
  );
}
