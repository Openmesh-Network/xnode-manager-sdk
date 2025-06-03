import type { AxiosInstance } from "axios";

export interface Session {
  axiosInstance: AxiosInstance;
  baseUrl: string;
}

export type Sessioned<Data> = { session: Session } & Data;

export async function SessionGet<Output, Path = undefined, Query = undefined>(
  input: Sessioned<{ path?: Path; query?: Query }>,
  scope: string,
  path: Path extends Object ? (path: Path) => string : string
): Promise<Output> {
  const session = input.session;
  return session.axiosInstance
    .get(
      `${session.baseUrl}${scope}${"path" in input && typeof path !== "string" ? path(input.path) : path}`,
      {
        params: "query" in input ? input.query : undefined,
      }
    )
    .then((res) => res.data as Output);
}

export async function SessionPost<Output, Path, Data>(
  input: Sessioned<{ path?: Path; data?: Data }>,
  scope: string,
  path: Path extends Object ? (path: Path) => string : string
): Promise<Output> {
  const session = input.session;
  return session.axiosInstance
    .post(
      `${session.baseUrl}${scope}${"path" in input && typeof path !== "string" ? path(input.path) : path}`,
      input.data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data as Output);
}
