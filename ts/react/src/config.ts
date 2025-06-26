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

export function useConfigContainers({
  session,
  overrides,
}: UseQueryInput<
  xnode.config.containers_input,
  xnode.config.containers_output
>): UseQueryOutput<xnode.config.containers_output> {
  return useQuery(
    {
      queryKey: ["useConfigContainers", session?.baseUrl ?? ""],
      enabled: !!session,
      queryFn: async () => {
        if (!session) {
          return undefined;
        }

        return await xnode.config.containers({
          session,
        });
      },
    },
    overrides
  );
}

export function useConfigContainerGet({
  session,
  container,
  overrides,
}: UseQueryInput<
  xnode.config.get_input,
  xnode.config.get_output
>): UseQueryOutput<xnode.config.get_output> {
  return useQuery(
    {
      queryKey: [
        "useConfigContainerGet",
        session?.baseUrl ?? "",
        container ?? "",
      ],
      enabled: !!session && !!container,
      queryFn: async () => {
        if (!session || !container) {
          return undefined;
        }

        return await xnode.config.get({
          session,
          path: { container },
        });
      },
    },
    overrides
  );
}

export function useConfigContainerSet(
  input: UseMutationInput<xnode.config.set_input, xnode.config.set_output> = {}
): UseMutationOutput<xnode.config.set_input, xnode.config.set_output> {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.config.set,
      onSuccess: ({ request_id }, { session, path: { container } }) => {
        awaitRequest({ request: { session, path: { request_id } } }).then(() =>
          Promise.all([
            queryClient.invalidateQueries({
              queryKey: ["useConfigContainers", session.baseUrl],
            }),
            queryClient.invalidateQueries({
              queryKey: ["useConfigContainerGet", session.baseUrl, container],
            }),
          ])
        );
      },
    },
    input?.overrides
  );
}

export function useConfigContainerRemove(
  input: UseMutationInput<
    xnode.config.remove_input,
    xnode.config.remove_output
  > = {}
): UseMutationOutput<xnode.config.remove_input, xnode.config.remove_output> {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.config.remove,
      onSuccess: ({ request_id }, { session, path: { container } }) => {
        awaitRequest({ request: { session, path: { request_id } } }).then(() =>
          Promise.all([
            queryClient.invalidateQueries({
              queryKey: ["useConfigContainers", session.baseUrl],
            }),
            queryClient.invalidateQueries({
              queryKey: ["useConfigContainerGet", session.baseUrl, container],
            }),
          ])
        );
      },
    },
    input?.overrides
  );
}
