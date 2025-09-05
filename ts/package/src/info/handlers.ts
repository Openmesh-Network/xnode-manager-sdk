import * as rust from "../utils/rust-types.js";

import type { Flake, FlakeQuery, Group, User } from "./models.js";
import { SessionGet, type Sessioned } from "../utils/session.js";

export function scope() {
  return "/info";
}

export type flake_input = Sessioned<{ query: FlakeQuery }>;
export type flake_output = Flake;
export async function flake(input: flake_input): Promise<flake_output> {
  return SessionGet(input, scope(), "/flake");
}

export type users_input = Sessioned<{
  path: { scope: rust.String };
}>;
export type users_output = rust.Vec<User>;
export async function users(input: users_input): Promise<users_output> {
  return SessionGet(input, scope(), (path) => `/users/${path.scope}/users`);
}

export type groups_input = Sessioned<{
  path: { scope: rust.String };
}>;
export type groups_output = rust.Vec<Group>;
export async function groups(input: groups_input): Promise<groups_output> {
  return SessionGet(input, scope(), (path) => `/users/${path.scope}/groups`);
}
