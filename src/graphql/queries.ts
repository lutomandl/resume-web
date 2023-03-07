// DO NOT EDIT!
// THIS FILE IS GENERATED WITH GRAPH GL CODEGEN.

import {
  useMutation,
  useQuery,
  useManualQuery,
  UseQueryOptions,
  UseClientRequestOptions,
} from 'graphql-hooks';

import { GraphQlError } from '../types';

import * as GQL from './schema';

// Data
export const DataQueryString = `query Data {
  header {
    data {
      attributes {
        name
        profession
        residence
      }
    }
  }
  about {
    data {
      attributes {
        firstParagraph
        secondParagraph
        thirdParagraph
        image {
          data {
            attributes {
              url
              alternativeText
              formats
            }
          }
        }
        heading {
          data {
            attributes {
              heading
              sectionId
            }
          }
        }
      }
    }
  }
  headings(sort: "id:asc") {
    data {
      id
      attributes {
        heading
        sectionId
      }
    }
  }
}
`;
export type Data_Query_type = typeof DataQueryString;
export function useData(
  options?: UseQueryOptions<GQL.DataQuery, GQL.DataQueryVariables>
) {
  return useQuery<GQL.DataQuery, GQL.DataQueryVariables, GraphQlError>(
    DataQueryString,
    { ...options, operationName: 'Data' }
  );
}
export function useManualData(
  options?: UseClientRequestOptions<GQL.DataQuery, GQL.DataQueryVariables>
) {
  return useManualQuery<GQL.DataQuery, GQL.DataQueryVariables, GraphQlError>(
    DataQueryString,
    { ...options, operationName: 'Data' }
  );
}
