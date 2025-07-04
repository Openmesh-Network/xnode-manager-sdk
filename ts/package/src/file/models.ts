import type { Output } from "../utils/output.js";
import * as rust from "../utils/rust-types.js";

export interface ReadFile {
  path: rust.String;
}

export interface WriteFile {
  path: rust.String;
  content: rust.Vec<rust.u8>;
}

export interface RemoveFile {
  path: rust.String;
}

export interface ReadDirectory {
  path: rust.String;
}

export interface CreateDirectory {
  path: rust.String;
  make_parent: rust.bool;
}

export interface RemoveDirectory {
  path: rust.String;
  make_empty: rust.bool;
}

export interface File {
  content: Output;
}

export interface Directory {
  directories: rust.Vec<rust.String>;
  files: rust.Vec<rust.String>;
  symlinks: rust.Vec<rust.String>;
  unknown: rust.Vec<rust.String>;
}
