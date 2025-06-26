import type { Flake, FlakeQuery } from "./models.js";
import { SessionGet, type Sessioned } from "../utils/session.js";

export function scope() {
  return "/info";
}

export type flake_input = Sessioned<{ query: FlakeQuery }>;
export type flake_output = Flake;
export async function flake(input: flake_input): Promise<flake_output> {
  return SessionGet(input, scope(), "/flake");
}
