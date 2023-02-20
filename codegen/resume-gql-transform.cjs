function ucFirst(string) {
  const [first, ...rest] = string.split('');
  return first.toUpperCase() + rest.join('');
}

module.exports = {
  plugin(schema, documents) {
    return [
      "import { useMutation, useQuery, useManualQuery, UseQueryOptions, UseClientRequestOptions } from 'graphql-hooks';",
      "import { GraphQlError } from '../types'",
      "import * as GQL from './schema';",
    ]
      .concat(
        documents.map(({ location, document: { definitions } }) => {
          if (definitions.length > 1) {
            console.warn('Only one definition per file is supported', location);
            return location;
          }

          const {
            operation,
            name: { value },
            selectionSet,
          } = definitions[0];

          const operationReturnType = `${value}${ucFirst(operation)}`;

          return [
            `// ${value}`,
            `export const ${operationReturnType}String = \`${selectionSet.selections[0].loc.source.body}\`;`,
            `export type ${value}_${ucFirst(
              operation
            )}_type = typeof ${operationReturnType}String;`,
            `export function use${value}(options?: UseQueryOptions<GQL.${operationReturnType}, GQL.${operationReturnType}Variables>) {
              return use${ucFirst(
                operation
              )}<GQL.${operationReturnType}, GQL.${operationReturnType}Variables, GraphQlError>(${operationReturnType}String, {...options, operationName: '${value}'});
          }`,
            operation === 'query'
              ? `export function useManual${value}(options?: UseClientRequestOptions<GQL.${operationReturnType}, GQL.${operationReturnType}Variables>) {
              return useManual${ucFirst(
                operation
              )}<GQL.${operationReturnType}, GQL.${operationReturnType}Variables, GraphQlError>(${operationReturnType}String, {...options, operationName: '${value}'});
          }`
              : '// --',
          ].join('\n');
        })
      )
      .join('\n\n');
  },
};
