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

export function useConfigContainer({
  session,
  container,
  overrides,
}: UseQueryInput<
  xnode.config.container_input,
  xnode.config.container_output
>): UseQueryOutput<xnode.config.container_output> {
  return useQuery(
    {
      queryKey: ["useConfigContainer", session?.baseUrl ?? "", container ?? ""],
      enabled: !!session && !!container,
      queryFn: async () => {
        if (!session || !container) {
          return undefined;
        }

        return await xnode.config.container({
          session,
          path: { container },
        });
      },
    },
    overrides
  );
}

export function useConfigContainerChange(
  input: UseMutationInput<
    xnode.config.change_input,
    xnode.config.change_output
  > = {}
): UseMutationOutput<xnode.config.change_input, xnode.config.change_output> {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.config.change,
      onSuccess: ({ request_id }, { session, path: { container } }) => {
        awaitRequest({ request: { session, path: { request_id } } }).then(() =>
          queryClient.invalidateQueries({
            queryKey: ["useConfigContainer", session.baseUrl, container],
          })
        );
      },
    },
    input?.overrides
  );
}

export function useConfigContainerDelete(
  input: UseMutationInput<
    xnode.config.delete_input,
    xnode.config.delete_output
  > = {}
): UseMutationOutput<xnode.config.delete_input, xnode.config.delete_output> {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.config.delete_,
      onSuccess: ({ request_id }, { session, path: { container } }) => {
        awaitRequest({ request: { session, path: { request_id } } }).then(() =>
          Promise.all([
            queryClient.invalidateQueries({
              queryKey: ["useConfigContainers", session.baseUrl],
            }),
            queryClient.invalidateQueries({
              queryKey: ["useConfigContainer", session.baseUrl, container],
            }),
          ])
        );
      },
    },
    input?.overrides
  );
}
