import * as rust from "../utils/rust-types.js";

import type { RequestIdResponse } from "../request/models.js";
import type { Log, LogQuery, Process, ProcessCommand } from "./models.js";
import type { Session } from "../utils/session.js";

export function scope() {
  return "/process";
}

export async function list({
  session,
  container,
}: {
  session: Session;
  container: rust.String;
}): Promise<Process[]> {
  return session.axiosInstance
    .get(`${session.baseUrl}${scope()}/list/${container}`)
    .then((res) => res.data as Process[]);
}

export async function logs({
  session,
  container,
  process,
  query,
}: {
  session: Session;
  container: rust.String;
  process: rust.String;
  query: LogQuery;
}): Promise<Log[]> {
  return session.axiosInstance
    .get(`${session.baseUrl}${scope()}/logs/${container}/${process}`, {
      params: query,
    })
    .then((res) => res.data as Log[]);
}

export async function execute({
  session,
  container,
  process,
  command,
}: {
  session: Session;
  container: rust.String;
  process: rust.String;
  command: ProcessCommand;
}): Promise<RequestIdResponse> {
  return session.axiosInstance
    .post(
      `${session.baseUrl}${scope()}/execute/${container}/${process}`,
      command,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data as RequestIdResponse);
}
