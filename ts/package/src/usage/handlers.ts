import type { Session } from "../utils/session.js";
import type { MemoryUsage, DiskUsage, CpuUsage } from "./models.js";

export function scope() {
  return "/usage";
}

export async function cpu({
  session,
}: {
  session: Session;
}): Promise<CpuUsage[]> {
  return session.axiosInstance
    .get(`${session.baseUrl}${scope()}/cpu`)
    .then((res) => res.data as CpuUsage[]);
}

export async function memory({
  session,
}: {
  session: Session;
}): Promise<MemoryUsage> {
  return session.axiosInstance
    .get(`${session.baseUrl}${scope()}/memory`)
    .then((res) => res.data as MemoryUsage);
}

export async function disk({
  session,
}: {
  session: Session;
}): Promise<DiskUsage[]> {
  return session.axiosInstance
    .get(`${session.baseUrl}${scope()}/disk`)
    .then((res) => res.data as DiskUsage[])
    .then((disk) => disk.filter((d) => d.mount_point.startsWith("/mnt")));
}
