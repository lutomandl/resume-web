// DO NOT EDIT!
// THIS FILE IS GENERATED WITH GRAPH GL CODEGEN.

import { useMutation, useQuery, useManualQuery, UseQueryOptions, UseClientRequestOptions } from 'graphql-hooks';

import { GraphQlError } from '../types'

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
export function useHome(options?: UseQueryOptions<GQL.HomeQuery, GQL.HomeQueryVariables>) {
              return useQuery<GQL.HomeQuery, GQL.HomeQueryVariables, GraphQlError>(HomeQueryString, {...options, operationName: 'Home'});
          }
export function useManualHome(options?: UseClientRequestOptions<GQL.HomeQuery, GQL.HomeQueryVariables>) {
              return useManualQuery<GQL.HomeQuery, GQL.HomeQueryVariables, GraphQlError>(HomeQueryString, {...options, operationName: 'Home'});
          }

// Routes
export const RoutesQueryString = `query Routes {
  routes(sort: "id:asc") {
    data {
      id
      attributes {
        heading
        pathName
        componentName
      }
    }
  }
}
`;
export type Routes_Query_type = typeof RoutesQueryString;
export function useRoutes(options?: UseQueryOptions<GQL.RoutesQuery, GQL.RoutesQueryVariables>) {
              return useQuery<GQL.RoutesQuery, GQL.RoutesQueryVariables, GraphQlError>(RoutesQueryString, {...options, operationName: 'Routes'});
          }
export function useManualRoutes(options?: UseClientRequestOptions<GQL.RoutesQuery, GQL.RoutesQueryVariables>) {
              return useManualQuery<GQL.RoutesQuery, GQL.RoutesQueryVariables, GraphQlError>(RoutesQueryString, {...options, operationName: 'Routes'});
          }