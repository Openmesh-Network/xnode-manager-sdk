import * as rust from "../utils/rust-types.js";

export interface ContainerConfiguration {
  flake: rust.String;
  flake_lock: rust.Option<rust.String>;
  network: rust.Option<rust.String>;
}

export interface ContainerSettings {
  flake: rust.String;
  network: rust.Option<rust.String>;
}

export interface ContainerChange {
  settings: ContainerSettings;
  update_inputs: rust.Option<rust.Vec<rust.String>>;
}
