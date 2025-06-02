import type { Output } from "../utils/output.js";
import * as rust from "../utils/rust-types.js";

export interface Process {
  name: rust.String;
  description: rust.Option<rust.String>;
  running: rust.bool;
}

export interface LogQuery {
  max: rust.Option<rust.u32>;
  level: rust.Option<LogLevel>;
}

export interface Log {
  timestamp: rust.u64; // Epoch time in Microseconds
  message: Output;
  level: LogLevel;
}

export type LogLevel = "Error" | "Warn" | "Info" | "Unknown";

export type ProcessCommand = "Start" | "Stop" | "Restart";
