import type { RequestIdResponse } from "../request/models.js";
import type { OSChange, OSConfiguration } from "./models.js";
import { SessionGet, SessionPost, type Sessioned } from "../utils/session.js";

export function scope() {
  return "/os";
}

export type get_input = Sessioned<{}>;
export type get_output = OSConfiguration;
export async function get(input: get_input): Promise<get_output> {
  return SessionGet(input, scope(), "/get");
}

export type set_input = Sessioned<{ data: OSChange }>;
export type set_output = RequestIdResponse;
export async function set(input: set_input): Promise<set_output> {
  return SessionPost(input, scope(), "/set");
}
