import { type UseQueryInput, useQuery, type UseQueryOutput } from "./utils.js";
import { xnode } from "@openmesh-network/xnode-manager-sdk";

export function useUsageCpu({
  session,
  overrides,
}: UseQueryInput<
  xnode.usage.cpu_input,
  xnode.usage.cpu_output
>): UseQueryOutput<xnode.usage.cpu_output> {
  return useQuery(
    {
      queryKey: ["useUsageCpu", session?.baseUrl ?? ""],
      enabled: !!session,
      refetchInterval: 1000, // 1 second
      queryFn: async () => {
        if (!session) {
          return undefined;
        }

        return await xnode.usage.cpu({
          session,
        });
      },
    },
    overrides
  );
}

export function useUsageMemory({
  session,
  overrides,
}: UseQueryInput<
  xnode.usage.memory_input,
  xnode.usage.memory_output
>): UseQueryOutput<xnode.usage.memory_output> {
  return useQuery(
    {
      queryKey: ["useUsageMemory", session?.baseUrl ?? ""],
      enabled: !!session,
      refetchInterval: 1000, // 1 second
      queryFn: async () => {
        if (!session) {
          return undefined;
        }

        return await xnode.usage.memory({
          session,
        });
      },
    },
    overrides
  );
}

export function useUsageDisk({
  session,
  overrides,
}: UseQueryInput<
  xnode.usage.disk_input,
  xnode.usage.disk_output
>): UseQueryOutput<xnode.usage.disk_output> {
  return useQuery(
    {
      queryKey: ["useUsageDisk", session?.baseUrl ?? ""],
      enabled: !!session,
      refetchInterval: 1000, // 1 second
      queryFn: async () => {
        if (!session) {
          return undefined;
        }

        return await xnode.usage.disk({
          session,
        });
      },
    },
    overrides
  );
}
