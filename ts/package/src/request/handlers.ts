import * as rust from "../utils/rust-types.js";

import { SessionGet, type Sessioned } from "../utils/session.js";
import type { CommandInfo, RequestId, RequestInfo } from "./models.js";

export function scope() {
  return "/request";
}

export type request_info_input = Sessioned<{
  path: { request_id: RequestId };
}>;
export type request_info_output = RequestInfo;
export async function request_info(
  input: request_info_input
): Promise<request_info_output> {
  return SessionGet<request_info_output, request_info_input["path"]>(
    input,
    scope(),
    (path) => `/info/${path.request_id}`
  ).then((data) => {
    return { ...data, commands: data.commands.sort() };
  });
}

export type command_info_input = Sessioned<{
  path: { request_id: RequestId; command: rust.String };
}>;
export type command_info_output = CommandInfo;
export async function command_info(
  input: command_info_input
): Promise<command_info_output> {
  return SessionGet(
    input,
    scope(),
    (path) => `/info/${path.request_id}/${path.command}`
  );
}
