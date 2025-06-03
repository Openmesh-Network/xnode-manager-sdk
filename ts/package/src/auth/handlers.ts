import * as rust from "../utils/rust-types.js";

import axios from "axios";
import { type Hex, parseSignature, toBytes } from "viem";
import type { Scope } from "./models.js";
import {
  SessionGet,
  SessionPost,
  type Session,
  type Sessioned,
} from "../utils/session.js";

export function scope() {
  return "/auth";
}

export type scopes_input = Sessioned<{}>;
export type scopes_output = rust.Vec<Scope>;
export async function scopes(input: scopes_input): Promise<scopes_output> {
  return SessionGet(input, scope(), "/scopes");
}

export type login_input = {
  baseUrl: string;
  sig: Hex;
};
export type login_output = Session;
export async function login({
  baseUrl,
  sig,
}: login_input): Promise<login_output> {
  const axiosInstance = axios.create({
    withCredentials: true, // Store cookies
  });

  const signature = parseSignature(sig);
  await axiosInstance.post(`${baseUrl}${scope()}/login`, {
    login_method: {
      WalletSignature: {
        v: signature.yParity,
        r: [...toBytes(signature.r)],
        s: [...toBytes(signature.s)],
      },
    },
  });

  return { axiosInstance, baseUrl } satisfies login_output;
}

export type logout_input = Sessioned<{}>;
export type logout_output = void;
export async function logout(input: logout_input): Promise<logout_output> {
  return SessionPost(input, scope(), "/logout");
}
