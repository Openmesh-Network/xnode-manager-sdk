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
  scope,
  overrides,
}: UseQueryInput<
  xnode.process.list_input,
  xnode.process.list_output
>): UseQueryOutput<xnode.process.list_output> {
  return useQuery(
    {
      queryKey: ["useProcessList", session?.baseUrl ?? "", scope ?? ""],
      enabled: !!session && !!scope,
      refetchInterval: 10_000, // 10 seconds
      queryFn: async () => {
        if (!session || !scope) {
          return undefined;
        }

        return await xnode.process.list({
          session,
          path: { scope },
        });
      },
    },
    overrides
  );
}

export function useProcessLogs({
  session,
  scope,
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
        scope ?? "",
        process ?? "",
      ],
      enabled: !!session && !!scope && !!process,
      refetchInterval: 1000, // 1 second
      queryFn: async () => {
        if (!session || !scope || !process) {
          return undefined;
        }

        return await xnode.process.logs({
          session,
          path: { scope, process },
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
              queryKey: ["useProcessList", session.baseUrl, path.scope],
            }),
            queryClient.invalidateQueries({
              queryKey: [
                "useProcessLogs",
                session.baseUrl,
                path.scope,
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
