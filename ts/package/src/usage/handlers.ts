import { SessionGet, type Sessioned } from "../utils/session.js";
import type { MemoryUsage, DiskUsage, CpuUsage } from "./models.js";

export function scope() {
  return "/usage";
}

export type cpu_input = Sessioned<{}>;
export type cpu_output = CpuUsage[];
export async function cpu(input: cpu_input): Promise<cpu_output> {
  return SessionGet(input, scope(), "/cpu");
}

export type memory_input = Sessioned<{}>;
export type memory_output = MemoryUsage;
export async function memory(input: memory_input): Promise<memory_output> {
  return SessionGet(input, scope(), "/memory");
}

export type disk_input = Sessioned<{}>;
export type disk_output = DiskUsage[];
export async function disk(input: disk_input): Promise<disk_output> {
  return SessionGet<disk_output>(input, scope(), "/disk").then((data) =>
    data.filter((d) => d.mount_point.startsWith("/mnt"))
  );
}
