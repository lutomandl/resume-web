import React, { useContext, useMemo } from 'react';
import { useData } from '../graphql/queries';
import { StrapiContentContext } from '../types';

const context = React.createContext<StrapiContentContext>(
  {} as StrapiContentContext
);

export function useStrapiContentContext() {
  return useContext(context);
}

interface GraphQlClientProviderProps {
  children: React.ReactNode;
}

export default function StrapiContentProvider({
  children,
}: GraphQlClientProviderProps) {
  const { data, loading, error } = useData();

  const contextValue = useMemo(
    () => ({
      data: data || null,
      loading,
      error: error || null,
    }),
    [data, loading, error]
  );

  return <context.Provider value={contextValue}>{children}</context.Provider>;
}
