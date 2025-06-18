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

export function useFileReadFile({
  session,
  scope,
  path,
  overrides,
}: UseQueryInput<
  xnode.file.read_file_input,
  xnode.file.read_file_output
>): UseQueryOutput<xnode.file.read_file_output> {
  return useQuery(
    {
      queryKey: [
        "useFileReadFile",
        session?.baseUrl ?? "",
        scope ?? "",
        path ?? "",
      ],
      enabled: !!session && !!scope && !!path,
      refetchInterval: 10_000, // 10 seconds
      queryFn: async () => {
        if (!session || !scope || !path) {
          return undefined;
        }

        return await xnode.file.read_file({
          session,
          path: { scope },
          query: { path },
        });
      },
    },
    overrides
  );
}

export function useFileWriteFile(
  input: UseMutationInput<
    xnode.file.write_file_input,
    xnode.file.write_file_output
  > = {}
): UseMutationOutput<
  xnode.file.write_file_input,
  xnode.file.write_file_output
> {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.file.write_file,
      onSuccess: (_, { session, path, data }) => {
        queryClient.invalidateQueries({
          queryKey: ["useFileReadFile", session.baseUrl, path.scope, data.path],
        });
      },
    },
    input?.overrides
  );
}

export function useFileRemoveFile(
  input: UseMutationInput<
    xnode.file.remove_file_input,
    xnode.file.remove_file_output
  > = {}
): UseMutationOutput<
  xnode.file.remove_file_input,
  xnode.file.remove_file_output
> {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.file.remove_file,
      onSuccess: (_, { session, path, data }) => {
        queryClient.invalidateQueries({
          queryKey: ["useFileReadFile", session.baseUrl, path.scope, data.path],
        });
      },
    },
    input?.overrides
  );
}

export function useFileReadDirectory({
  session,
  scope,
  path,
  overrides,
}: UseQueryInput<
  xnode.file.read_directory_input,
  xnode.file.read_directory_output
>): UseQueryOutput<xnode.file.read_directory_output> {
  return useQuery(
    {
      queryKey: [
        "useFileReadDirectory",
        session?.baseUrl ?? "",
        scope ?? "",
        path ?? "",
      ],
      enabled: !!session && !!scope && !!path,
      refetchInterval: 10_000, // 10 seconds
      queryFn: async () => {
        if (!session || !scope || !path) {
          return undefined;
        }

        return await xnode.file.read_directory({
          session,
          path: { scope },
          query: { path },
        });
      },
    },
    overrides
  );
}

export function useFileCreateDirectory(
  input: UseMutationInput<
    xnode.file.create_directory_input,
    xnode.file.create_directory_output
  > = {}
): UseMutationOutput<
  xnode.file.create_directory_input,
  xnode.file.create_directory_output
> {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.file.create_directory,
      onSuccess: (_, { session, path, data }) => {
        queryClient.invalidateQueries({
          queryKey: [
            "useFileReadDirectory",
            session.baseUrl,
            path.scope,
          ].concat(data.make_parent ? [] : [data.path]), // make parent can effect other paths, refresh all
        });
      },
    },
    input?.overrides
  );
}

export function useFileRemoveDirectory(
  input: UseMutationInput<
    xnode.file.remove_directory_input,
    xnode.file.remove_directory_output
  > = {}
): UseMutationOutput<
  xnode.file.remove_directory_input,
  xnode.file.remove_directory_output
> {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: xnode.file.remove_directory,
      onSuccess: (_, { session, path, data }) => {
        if (data.make_empty) {
          // make make_empty can effect other paths, including files, refresh all
          Promise.all([
            queryClient.invalidateQueries({
              queryKey: ["useFileReadFile", session.baseUrl, path.scope],
            }),
            queryClient.invalidateQueries({
              queryKey: ["useFileReadDirectory", session.baseUrl, path.scope],
            }),
          ]);
        } else {
          queryClient.invalidateQueries({
            queryKey: [
              "useFileReadDirectory",
              session.baseUrl,
              path.scope,
              data.path,
            ],
          });
        }
      },
    },
    input?.overrides
  );
}
