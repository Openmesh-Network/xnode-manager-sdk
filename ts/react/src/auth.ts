import {
  type UseQueryInput,
  type QueryOverrides,
  type UseMutationOutput,
  useQuery,
  type UseQueryOutput,
  type UseMutationInput,
  useMutation,
} from "./utils.js";
import { xnode } from "@openmesh-network/xnode-manager-sdk";
import { useQueryClient } from "@tanstack/react-query";

export function useAuthSession({
  baseUrl,
  sig,
  overrides,
}: {
  baseUrl?: string;
  sig?: `0x${string}`;
  overrides?: QueryOverrides<xnode.auth.login_output>;
}): UseQueryOutput<xnode.auth.login_output> {
  return useQuery(
    {
      queryKey: ["useAuthSession", baseUrl ?? "", sig ?? ""],
      enabled: !!baseUrl && !!sig,
      queryFn: async () => {
        if (!baseUrl || !sig) {
          return undefined;
        }

        return await xnode.auth.login({
          baseUrl,
          sig,
        });
      },
    },
    overrides
  );
}

export function useAuthScopes({
  session,
  overrides,
}: UseQueryInput<
  xnode.auth.scopes_input,
  xnode.auth.scopes_output
>): UseQueryOutput<xnode.auth.scopes_output> {
  return useQuery(
    {
      queryKey: ["useAuthScopes", session?.baseUrl ?? ""],
      enabled: !!session,
      queryFn: async () => {
        if (!session) {
          return undefined;
        }

        return await xnode.auth.scopes({
          session,
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
