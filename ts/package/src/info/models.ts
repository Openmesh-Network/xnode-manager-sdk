import * as rust from "../utils/rust-types.js";

export interface FlakeQuery {
  flake: rust.String;
}

export interface Flake {
  last_modified: rust.u64;
  revision: rust.String;
}

export interface User {
  name: rust.String;
  id: rust.u32;
  group: rust.u32;
  description: rust.String;
  home: rust.String;
  login: rust.String;
}

export interface Group {
  name: rust.String;
  id: rust.u32;
  members: rust.Vec<rust.String>;
}
