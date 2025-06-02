import type { Output } from "../utils/output.js";
import * as rust from "../utils/rust-types.js";

export interface Location {
  container: rust.String;
  path: rust.String;
}

export interface ReadFile {
  location: Location;
}

export interface WriteFile {
  location: Location;
  content: rust.Vec<rust.u8>;
}

export interface RemoveFile {
  location: Location;
}

export interface ReadDirectory {
  location: Location;
}

export interface CreateDirectory {
  location: Location;
  make_parent: rust.bool;
}

export interface RemoveDirectory {
  location: Location;
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
