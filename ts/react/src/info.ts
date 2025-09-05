import { type UseQueryInput, useQuery, type UseQueryOutput } from "./utils.js";
import { xnode } from "@openmesh-network/xnode-manager-sdk";

export function useInfoFlake({
  session,
  flake,
  overrides,
}: UseQueryInput<
  xnode.info.flake_input,
  xnode.info.flake_output
>): UseQueryOutput<xnode.info.flake_output> {
  return useQuery(
    {
      queryKey: ["useInfoFlake", session?.baseUrl ?? "", flake ?? ""],
      enabled: !!session && !!flake,
      refetchInterval: 60_000, // 1 minute
      queryFn: async () => {
        if (!session || !flake) {
          return undefined;
        }

        return await xnode.info.flake({
          session,
          query: { flake },
        });
      },
    },
    overrides
  );
}

export function useInfoUsers({
  session,
  scope,
  overrides,
}: UseQueryInput<
  xnode.info.users_input,
  xnode.info.users_output
>): UseQueryOutput<xnode.info.users_output> {
  return useQuery(
    {
      queryKey: ["useInfoUsers", session?.baseUrl ?? "", scope ?? ""],
      enabled: !!session && !!scope,
      refetchInterval: 60_000, // 1 minute
      queryFn: async () => {
        if (!session || !scope) {
          return undefined;
        }

        return await xnode.info.users({
          session,
          path: { scope },
        });
      },
    },
    overrides
  );
}

export function useInfoGroups({
  session,
  scope,
  overrides,
}: UseQueryInput<
  xnode.info.groups_input,
  xnode.info.groups_output
>): UseQueryOutput<xnode.info.groups_output> {
  return useQuery(
    {
      queryKey: ["useInfoGroups", session?.baseUrl ?? "", scope ?? ""],
      enabled: !!session && !!scope,
      refetchInterval: 60_000, // 1 minute
      queryFn: async () => {
        if (!session || !scope) {
          return undefined;
        }

        return await xnode.info.groups({
          session,
          path: { scope },
        });
      },
    },
    overrides
  );
}
