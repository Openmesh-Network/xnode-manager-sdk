import * as rust from "../utils/rust-types.js";

import type { Flake } from "./models.js";
import { SessionGet, type Sessioned } from "../utils/session.js";

export function scope() {
  return "/info";
}

export type flake_input = Sessioned<{ query: { flake: rust.String } }>;
export type flake_output = Flake;
export async function flake(input: flake_input): Promise<flake_output> {
  return SessionGet(input, scope(), "/flake");
}
