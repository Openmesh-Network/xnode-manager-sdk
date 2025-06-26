import { type UseQueryInput, useQuery, type UseQueryOutput } from "./utils.js";
import { xnode } from "@openmesh-network/xnode-manager-sdk";

export function useUsageCpu({
  session,
  scope,
  overrides,
}: UseQueryInput<
  xnode.usage.cpu_input,
  xnode.usage.cpu_output
>): UseQueryOutput<xnode.usage.cpu_output> {
  return useQuery(
    {
      queryKey: ["useUsageCpu", session?.baseUrl ?? "", scope ?? ""],
      enabled: !!session && !!scope,
      refetchInterval: 1000, // 1 second
      queryFn: async () => {
        if (!session || !scope) {
          return undefined;
        }

        return await xnode.usage.cpu({
          session,
          path: { scope },
        });
      },
    },
    overrides
  );
}

export function useUsageMemory({
  session,
  scope,
  overrides,
}: UseQueryInput<
  xnode.usage.memory_input,
  xnode.usage.memory_output
>): UseQueryOutput<xnode.usage.memory_output> {
  return useQuery(
    {
      queryKey: ["useUsageMemory", session?.baseUrl ?? "", scope ?? ""],
      enabled: !!session && !!scope,
      refetchInterval: 1000, // 1 second
      queryFn: async () => {
        if (!session || !scope) {
          return undefined;
        }

        return await xnode.usage.memory({
          session,
          path: { scope },
        });
      },
    },
    overrides
  );
}

export function useUsageDisk({
  session,
  scope,
  overrides,
}: UseQueryInput<
  xnode.usage.disk_input,
  xnode.usage.disk_output
>): UseQueryOutput<xnode.usage.disk_output> {
  return useQuery(
    {
      queryKey: ["useUsageDisk", session?.baseUrl ?? "", scope ?? ""],
      enabled: !!session && !!scope,
      refetchInterval: 1000, // 1 second
      queryFn: async () => {
        if (!session || !scope) {
          return undefined;
        }

        return await xnode.usage.disk({
          session,
          path: { scope },
        });
      },
    },
    overrides
  );
}
