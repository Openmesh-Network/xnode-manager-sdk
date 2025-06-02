import * as rust from "../utils/rust-types.js";

export interface CpuUsage {
  name: rust.String;
  used: rust.f32;
  frequency: rust.u64;
}

export interface MemoryUsage {
  used: rust.u64;
  total: rust.u64;
}

export interface DiskUsage {
  mount_point: rust.String;
  used: rust.u64;
  total: rust.u64;
}
