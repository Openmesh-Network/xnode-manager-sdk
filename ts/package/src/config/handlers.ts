import * as rust from "../utils/rust-types.js";

import type { RequestIdResponse } from "../request/models.js";
import type { Session } from "../utils/session.js";
import type { ContainerConfiguration, ConfigurationAction } from "./models.js";

export function scope() {
  return "/config";
}

export async function containers({
  session,
}: {
  session: Session;
}): Promise<rust.Vec<rust.String>> {
  return session.axiosInstance
    .get(`${session.baseUrl}/config/containers`)
    .then((res) => res.data as rust.Vec<rust.String>);
}

export async function container({
  session,
  container,
}: {
  session: Session;
  container: rust.String;
}): Promise<ContainerConfiguration> {
  return session.axiosInstance
    .get(`${session.baseUrl}${scope()}/container/${container}`)
    .then((res) => res.data as ContainerConfiguration);
}

export async function change({
  session,
  changes,
}: {
  session: Session;
  changes: rust.Vec<ConfigurationAction>;
}): Promise<RequestIdResponse> {
  return session.axiosInstance
    .post(`${session.baseUrl}${scope()}/change`, changes)
    .then((res) => res.data as RequestIdResponse);
}
