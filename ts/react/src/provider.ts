import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createElement, useMemo, type ReactNode } from "react";

export function XnodeManagerSDKProvider({ children }: { children: ReactNode }) {
  const queryClient = useMemo(() => new QueryClient(), []);
  return createElement(QueryClientProvider, { client: queryClient }, children);
}
