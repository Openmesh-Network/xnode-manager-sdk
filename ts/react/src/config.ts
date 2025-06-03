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

export function useConfigChange(
  input: UseMutationInput<
    xnode.config.change_input,
    xnode.config.change_output
  > = {}
): UseMutationOutput<xnode.config.change_input, xnode.config.change_output> {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.config.change,
      onSuccess: ({ request_id }, { session, data }) => {
        awaitRequest({ request: { session, path: { request_id } } }).then(() =>
          Promise.all(
            [
              ...data
                .reduce((prev, cur) => {
                  const container =
                    "Set" in cur
                      ? cur.Set.container
                      : "Remove" in cur
                        ? cur.Remove.container
                        : "";
                  if (container) {
                    prev.add(container);
                  }
                  return prev;
                }, new Set<xnode.utils.String>())
                .values(),
            ].map((container) =>
              queryClient.invalidateQueries({
                queryKey: ["useConfigContainer", session.baseUrl, container],
              })
            )
          )
        );
      },
    },
    input?.overrides
  );
}
