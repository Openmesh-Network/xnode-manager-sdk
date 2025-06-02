import * as rust from "../utils/rust-types.js";

export type Scope = "Config" | "OS" | "File" | "Process" | "Usage" | "Request";

export type AdditionalVerification = {
  WalletSignature: { v: rust.u32; r: rust.u32[]; s: rust.u32[] };
};

export type LoginMethod = {
  WalletSignature: { v: rust.u32; r: rust.u32[]; s: rust.u32[] };
};

export interface Login {
  login_method: LoginMethod;
}
