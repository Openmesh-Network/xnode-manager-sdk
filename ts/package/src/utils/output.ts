import * as rust from "../utils/rust-types.js";

export type Output =
  | {
      Bytes: { output: rust.Vec<rust.u8> };
    }
  | {
      UTF8: { output: rust.String };
    };

export function string_to_bytes(string: rust.String): rust.Vec<rust.u8> {
  return [...new TextEncoder().encode(string).values()];
}

export function output_to_string(output: Output): rust.String | null {
  if ("UTF8" in output) {
    return output.UTF8.output;
  }

  return null;
}
