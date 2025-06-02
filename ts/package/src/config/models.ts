import * as rust from "../utils/rust-types.js";

export interface ContainerConfiguration {
  flake: rust.String;
  flake_lock: rust.String;
  network: rust.Option<rust.String>;
}

export interface ContainerSettings {
  flake: rust.String;
  network: rust.Option<rust.String>;
}

export type ConfigurationAction =
  | {
      Set: {
        container: rust.String;
        settings: ContainerSettings;
        update_inputs: rust.Option<rust.Vec<rust.String>>;
      };
    }
  | {
      Remove: {
        container: rust.String;
      };
    };
