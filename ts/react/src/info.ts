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
