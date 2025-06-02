import * as rust from "../utils/rust-types.js";

export interface OSChange {
  flake: rust.Option<rust.String>;
  update_inputs: rust.Option<rust.Vec<rust.String>>;

  xnode_owner: rust.Option<rust.String>;
  domain: rust.Option<rust.String>;
  acme_email: rust.Option<rust.String>;
  user_passwd: rust.Option<rust.String>;
}

export interface OSConfiguration {
  flake: rust.String;
  flake_lock: rust.String;

  xnode_owner: rust.Option<rust.String>;
  domain: rust.Option<rust.String>;
  acme_email: rust.Option<rust.String>;
  user_passwd: rust.Option<rust.String>;
}
