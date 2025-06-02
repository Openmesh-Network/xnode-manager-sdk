import type { RequestIdResponse } from "../request/models.js";
import type { OSChange, OSConfiguration } from "./models.js";
import type { Session } from "../utils/session.js";

export function scope() {
  return "/os";
}

export async function get({
  session,
}: {
  session: Session;
}): Promise<OSConfiguration> {
  return session.axiosInstance
    .get(`${session.baseUrl}${scope()}/get`)
    .then((res) => res.data as OSConfiguration);
}

export async function set({
  session,
  os,
}: {
  session: Session;
  os: OSChange;
}): Promise<RequestIdResponse> {
  return session.axiosInstance
    .post(`${session.baseUrl}${scope()}/set`, os)
    .then((res) => res.data as RequestIdResponse);
}
