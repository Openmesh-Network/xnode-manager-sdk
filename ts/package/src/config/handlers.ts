import * as rust from "../utils/rust-types.js";

import type { RequestIdResponse } from "../request/models.js";
import { SessionGet, SessionPost, type Sessioned } from "../utils/session.js";
import type { ContainerChange, ContainerConfiguration } from "./models.js";

export function scope() {
  return "/config";
}

export type containers_input = Sessioned<{}>;
export type containers_output = rust.Vec<rust.String>;
export async function containers(
  input: containers_input
): Promise<containers_output> {
  return SessionGet(input, scope(), "/containers");
}

export type container_input = Sessioned<{
  path: { container: rust.String };
}>;
export type container_output = ContainerConfiguration;
export async function container(
  input: container_input
): Promise<container_output> {
  return SessionGet(input, scope(), (path) => `/container/${path.container}`);
}

export type change_input = Sessioned<{
  path: { container: rust.String };
  data: ContainerChange;
}>;
export type change_output = RequestIdResponse;
export async function change(input: change_input): Promise<change_output> {
  return SessionPost(
    input,
    scope(),
    (path) => `/container/${path.container}/change`
  );
}

export type delete_input = Sessioned<{ path: { container: rust.String } }>;
export type delete_output = RequestIdResponse;
export async function delete_(input: delete_input): Promise<delete_output> {
  return SessionPost(
    input,
    scope(),
    (path) => `/container/${path.container}/delete`
  );
}
