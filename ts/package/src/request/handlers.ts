import * as rust from "../utils/rust-types.js";

import type { Session } from "../utils/session.js";
import type { CommandInfo, RequestId, RequestInfo } from "./models.js";

export function scope() {
  return "/request";
}

export async function request_info({
  session,
  request_id,
}: {
  session: Session;
  request_id: RequestId;
}): Promise<RequestInfo> {
  return session.axiosInstance
    .get(`${session.baseUrl}${scope()}/info/${request_id}`)
    .then((res) => res.data as RequestInfo)
    .then((info) => {
      return { ...info, commands: info.commands.sort() };
    });
}

export async function command_info({
  session,
  request_id,
  command,
}: {
  session: Session;
  request_id: RequestId;
  command: rust.String;
}): Promise<CommandInfo> {
  return session.axiosInstance
    .get(`${session.baseUrl}${scope()}/info/${request_id}/${command}`)
    .then((res) => res.data as CommandInfo);
}
