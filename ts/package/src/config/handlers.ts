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

export type get_input = Sessioned<{
  path: { container: rust.String };
}>;
export type get_output = ContainerConfiguration;
export async function get(input: get_input): Promise<get_output> {
  return SessionGet(
    input,
    scope(),
    (path) => `/container/${path.container}/get`
  );
}

export type set_input = Sessioned<{
  path: { container: rust.String };
  data: ContainerChange;
}>;
export type set_output = RequestIdResponse;
export async function set(input: set_input): Promise<set_output> {
  return SessionPost(
    input,
    scope(),
    (path) => `/container/${path.container}/set`
  );
}

export type remove_input = Sessioned<{ path: { container: rust.String } }>;
export type remove_output = RequestIdResponse;
export async function remove(input: remove_input): Promise<remove_output> {
  return SessionPost(
    input,
    scope(),
    (path) => `/container/${path.container}/remove`
  );
}
