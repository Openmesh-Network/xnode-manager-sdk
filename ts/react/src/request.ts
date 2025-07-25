import { type UseQueryInput, useQuery, type UseQueryOutput } from "./utils.js";
import { xnode } from "@openmesh-network/xnode-manager-sdk";

export function useRequestRequestInfo({
  session,
  request_id,
  overrides,
}: UseQueryInput<
  xnode.request.request_info_input,
  xnode.request.request_info_output
>): UseQueryOutput<xnode.request.request_info_output> {
  return useQuery(
    {
      queryKey: [
        "useRequestRequestInfo",
        session?.baseUrl ?? "",
        request_id ?? "",
      ],
      enabled: !!session && !!request_id,
      refetchInterval: ({ state }) => (state.data?.result ? undefined : 1000), // 1 second until result
      queryFn: async () => {
        if (!session || !request_id) {
          return undefined;
        }

        return await xnode.request.request_info({
          session,
          path: { request_id },
        });
      },
    },
    overrides
  );
}

export function useRequestCommandInfo({
  session,
  request_id,
  command,
  overrides,
}: UseQueryInput<
  xnode.request.command_info_input,
  xnode.request.command_info_output
>): UseQueryOutput<xnode.request.command_info_output> {
  return useQuery(
    {
      queryKey: [
        "useRequestCommandInfo",
        session?.baseUrl ?? "",
        request_id ?? "",
        command ?? "",
      ],
      enabled: !!session && !!request_id && !!command,
      refetchInterval: ({ state }) => (state.data?.result ? undefined : 1000), // 1 second until result
      queryFn: async () => {
        if (!session || !request_id || !command) {
          return undefined;
        }

        return await xnode.request.command_info({
          session,
          path: { request_id, command },
        });
      },
    },
    overrides
  );
}

export async function awaitRequest({
  request,
  pollInterval,
}: {
  request: xnode.request.request_info_input;
  pollInterval?: number; // In milliseconds, default 1000 (1 second)
}): Promise<xnode.request.request_info_output> {
  let request_info: xnode.request.request_info_output | undefined;
  while (!request_info?.result) {
    await new Promise((resolve) => setTimeout(resolve, pollInterval ?? 1000));
    request_info = await xnode.request
      .request_info(request)
      .catch(() => undefined);
  }

  return request_info;
}
