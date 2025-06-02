import type { Output } from "../utils/output.js";
import * as rust from "../utils/rust-types.js";

export type RequestId = number;

export interface RequestIdResponse {
  request_id: RequestId;
}

export type RequestIdResult =
  | {
      Success: { body: rust.Option<rust.String> };
    }
  | {
      Error: { error: rust.String };
    };

export interface RequestInfo {
  commands: rust.Vec<rust.String>;
  result: rust.Option<RequestIdResult>;
}

export interface CommandInfo {
  command: rust.String;
  stdout: Output;
  stderr: Output;
  result: rust.Option<rust.String>;
}
