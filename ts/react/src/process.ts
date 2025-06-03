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

export function useProcessList({
  session,
  container,
  overrides,
}: UseQueryInput<
  xnode.process.list_input,
  xnode.process.list_output
>): UseQueryOutput<xnode.process.list_output> {
  return useQuery(
    {
      queryKey: ["useProcessList", session?.baseUrl ?? "", container ?? ""],
      enabled: !!session && !!container,
      refetchInterval: 10_000, // 10 seconds
      queryFn: async () => {
        if (!session || !container) {
          return undefined;
        }

        return await xnode.process.list({
          session,
          path: { container },
        });
      },
    },
    overrides
  );
}

export function useProcessLogs({
  session,
  container,
  process,
  level,
  max,
  overrides,
}: UseQueryInput<
  xnode.process.logs_input,
  xnode.process.logs_output
>): UseQueryOutput<xnode.process.logs_output> {
  return useQuery(
    {
      queryKey: [
        "useProcessLogs",
        session?.baseUrl ?? "",
        container ?? "",
        process ?? "",
      ],
      enabled: !!session && !!container && !!process,
      refetchInterval: 1000, // 1 second
      queryFn: async () => {
        if (!session || !container || !process) {
          return undefined;
        }

        return await xnode.process.logs({
          session,
          path: { container, process },
          query: { level: level ?? null, max: max ?? null },
        });
      },
    },
    overrides
  );
}

export function useProcessExecute(
  input: UseMutationInput<
    xnode.process.execute_input,
    xnode.process.execute_output
  > = {}
): UseMutationOutput<
  xnode.process.execute_input,
  xnode.process.execute_output
> {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.process.execute,
      onSuccess: ({ request_id }, { session, path }) => {
        awaitRequest({ request: { session, path: { request_id } } }).then(() =>
          Promise.all([
            queryClient.invalidateQueries({
              queryKey: ["useProcessList", session.baseUrl, path.container],
            }),
            queryClient.invalidateQueries({
              queryKey: [
                "useProcessLogs",
                session.baseUrl,
                path.container,
                path.process,
              ],
            }),
          ])
        );
      },
    },
    input?.overrides
  );
}
