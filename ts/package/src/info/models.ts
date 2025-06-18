import * as rust from "../utils/rust-types.js";

export interface Flake {
  last_modified: rust.u64;
  revision: rust.String;
}
