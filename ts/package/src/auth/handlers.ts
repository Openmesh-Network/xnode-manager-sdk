import axios from "axios";
import { SessionPost, type Session, type Sessioned } from "../utils/session.js";

export function scope() {
  return "/xnode-auth";
}

export type login_input = {
  baseUrl: string;
  user: string;
} & (
  | {
      signature: string;
      timestamp: string;
    }
  | {}
);
export type login_output = Session;
export async function login({
  baseUrl,
  ...loginParams
}: login_input): Promise<login_output> {
  const axiosInstance = axios.create({
    withCredentials: true, // Store cookies
  });

  await axiosInstance.post(`${baseUrl}${scope()}/api/login`, loginParams);

  return { axiosInstance, baseUrl };
}

export type logout_input = Sessioned<{}>;
export type logout_output = void;
export async function logout(input: logout_input): Promise<logout_output> {
  return SessionPost(input, scope(), "/api/logout");
}
