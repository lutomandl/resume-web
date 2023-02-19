import memCache from 'graphql-hooks-memcache';
import React, { useMemo } from 'react';
import { ClientContext, GraphQLClient } from 'graphql-hooks';

// eslint-disable-next-line react/jsx-no-constructed-context-values
// const client = new GraphQLClient({
//   url: 'http://3.123.231.160/graphql',
//   cache: memCache(),
// });

interface GraphQlClientProviderProps {
  children: React.ReactNode;
}

export default function GraphQlClientProvider({
  children,
}: GraphQlClientProviderProps) {
  const client = useMemo(
    () =>
      new GraphQLClient({
        url: `http://localhost:1337/graphql`,
        cache: memCache(),
        headers: {
          Authorization: `Bearer e4b2e2f10c596f35a1e4823f39211daa14f2edd9a6c78f2ee01430cf41ffd1a7b8c27b5c1e8552c5a83b98ec3acbbc81c07e2034e22212b8e3f212f071deb9b38fcf4d0bd7b35bb01d5ef44e35d357116f6544e185e4141aed8d445e6f31d7ddfb09e4bc3df5dce8b442afba2eb638618a032932a4c965bc4ca6ec9497ba15b5`,
        },
      }),
    []
  );

  return (
    <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
  );
}
