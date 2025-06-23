import {
  type QueryOverrides,
  type UseMutationOutput,
  useQuery,
  type UseQueryOutput,
  type UseMutationInput,
  useMutation,
} from "./utils.js";
import { xnode } from "@openmesh-network/xnode-manager-sdk";
import { useQueryClient } from "@tanstack/react-query";

export function useAuthLogin({
  baseUrl,
  user,
  overrides,
  ...loginArgs
}: Partial<xnode.auth.login_input> & {
  overrides?: QueryOverrides<xnode.auth.login_output>;
}): UseQueryOutput<xnode.auth.login_output> {
  return useQuery(
    {
      queryKey: ["useAuthSession", baseUrl ?? "", user ?? ""],
      enabled: !!baseUrl && !!user,
      queryFn: async () => {
        if (!baseUrl || !user) {
          return undefined;
        }

        return await xnode.auth.login({
          baseUrl,
          user,
          ...loginArgs,
        });
      },
    },
    overrides
  );
}

export function useAuthLogout(
  input: UseMutationInput<
    xnode.auth.logout_input,
    xnode.auth.logout_output
  > = {}
): UseMutationOutput<xnode.auth.logout_input, xnode.auth.logout_output> {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.auth.logout,
      onSuccess: (_, { session }) => {
        queryClient.invalidateQueries({
          queryKey: [session.baseUrl], // Invalidate all data fetched with the old session
        });
      },
    },
    input?.overrides
  );
}
