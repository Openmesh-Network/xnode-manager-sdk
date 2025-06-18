import {
  type UseQueryInput,
  type UseMutationOutput,
  useQuery,
  type UseQueryOutput,
  type UseMutationInput,
  useMutation,
} from "./utils.js";
import { xnode } from "@openmesh-network/xnode-manager-sdk";
import { useQueryClient } from "@tanstack/react-query";
import { awaitRequest } from "./request.js";

export function useOsGet({
  session,
  overrides,
}: UseQueryInput<
  xnode.os.get_input,
  xnode.os.get_output
>): UseQueryOutput<xnode.os.get_output> {
  return useQuery(
    {
      queryKey: ["useOSGet", session?.baseUrl ?? ""],
      enabled: !!session,
      queryFn: async () => {
        if (!session) {
          return undefined;
        }

        return await xnode.os.get({
          session,
        });
      },
    },
    overrides
  );
}

export function useOsSet(
  input: UseMutationInput<xnode.os.set_input, xnode.os.set_output> = {}
): UseMutationOutput<xnode.os.set_input, xnode.os.set_output> {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.os.set,
      onSuccess: ({ request_id }, { session }) => {
        awaitRequest({ request: { session, path: { request_id } } }).then(() =>
          queryClient.invalidateQueries({
            queryKey: ["useOSGet", session.baseUrl],
          })
        );
      },
    },
    input?.overrides
  );
}

export function useOsReboot(
  input: UseMutationInput<xnode.os.reboot_input, xnode.os.reboot_output> = {}
): UseMutationOutput<xnode.os.reboot_input, xnode.os.reboot_output> {
  return useMutation(
    {
      mutationFn: xnode.os.reboot,
    },
    input?.overrides
  );
}
