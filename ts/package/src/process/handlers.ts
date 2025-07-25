import * as rust from "../utils/rust-types.js";

import type { RequestIdResponse } from "../request/models.js";
import type { Log, LogQuery, Process, ProcessCommand } from "./models.js";
import { SessionGet, SessionPost, type Sessioned } from "../utils/session.js";

export function scope() {
  return "/process";
}

export type list_input = Sessioned<{ path: { scope: rust.String } }>;
export type list_output = rust.Vec<Process>;
export async function list(input: list_input): Promise<list_output> {
  return SessionGet(input, scope(), (path) => `/${path.scope}/list`);
}

export type logs_input = Sessioned<{
  path: { scope: rust.String; process: rust.String };
  query: LogQuery;
}>;
export type logs_output = rust.Vec<Log>;
export async function logs(input: logs_input): Promise<logs_output> {
  return SessionGet(
    input,
    scope(),
    (path) => `/${path.scope}/${path.process}/logs`
  );
}

export type execute_input = Sessioned<{
  path: { scope: rust.String; process: rust.String };
  data: ProcessCommand;
}>;
export type execute_output = RequestIdResponse;
export async function execute(input: execute_input): Promise<execute_output> {
  return SessionPost(
    input,
    scope(),
    (path) => `/${path.scope}/${path.process}/execute`
  );
}
