import memCache from 'graphql-hooks-memcache';
import React, { useMemo } from 'react';
import { ClientContext, GraphQLClient } from 'graphql-hooks';

interface GraphQlClientProviderProps {
  children: React.ReactNode;
}

export default function GraphQlClientProvider({
  children,
}: GraphQlClientProviderProps) {
  const client = useMemo(
    () =>
      new GraphQLClient({
        url: `${import.meta.env.VITE_STRAPI_URL}/graphql`,
        cache: memCache(),
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`,
        },
      }),
    []
  );

  return (
    <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
  );
}
