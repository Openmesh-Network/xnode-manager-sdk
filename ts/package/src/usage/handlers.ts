import * as rust from "../utils/rust-types.js";

import { SessionGet, type Sessioned } from "../utils/session.js";
import type { MemoryUsage, DiskUsage, CpuUsage } from "./models.js";

export function scope() {
  return "/usage";
}

export type cpu_input = Sessioned<{
  path: {
    scope: rust.String;
  };
}>;
export type cpu_output = rust.Vec<CpuUsage>;
export async function cpu(input: cpu_input): Promise<cpu_output> {
  return SessionGet(input, scope(), (path) => `/${path}/cpu`);
}

export type memory_input = Sessioned<{
  path: {
    scope: rust.String;
  };
}>;
export type memory_output = MemoryUsage;
export async function memory(input: memory_input): Promise<memory_output> {
  return SessionGet(input, scope(), (path) => `/${path}/memory`);
}

export type disk_input = Sessioned<{
  path: {
    scope: rust.String;
  };
}>;
export type disk_output = rust.Vec<DiskUsage>;
export async function disk(input: disk_input): Promise<disk_output> {
  return SessionGet<disk_output, disk_input["path"]>(
    input,
    scope(),
    (path) => `/${path}/disk`
  ).then((data) => data.filter((d) => d.mount_point.startsWith("/mnt")));
}
