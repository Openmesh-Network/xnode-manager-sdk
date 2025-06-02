import * as rust from "../utils/rust-types.js";

import axios from "axios";
import { type Hex, parseSignature, toBytes } from "viem";
import type { Scope } from "./models.js";
import type { Session } from "../utils/session.js";

export function scope() {
  return "/auth";
}

export async function scopes({
  session,
}: {
  session: Session;
}): Promise<rust.Vec<Scope>> {
  return session.axiosInstance
    .get(`${session.baseUrl}${scope()}/scopes`)
    .then((res) => res.data as rust.Vec<Scope>);
}

export async function login({
  baseUrl,
  sig,
}: {
  baseUrl: string;
  sig: Hex;
}): Promise<Session> {
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

  return { axiosInstance, baseUrl };
}

export async function logout({ session }: { session: Session }): Promise<void> {
  return session.axiosInstance.get(`${session.baseUrl}${scope()}/logout`);
}
