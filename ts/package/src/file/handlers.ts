import * as rust from "../utils/rust-types.js";

import { SessionGet, SessionPost, type Sessioned } from "../utils/session.js";
import type {
  CreateDirectory,
  Directory,
  File,
  ReadDirectory,
  ReadFile,
  RemoveDirectory,
  RemoveFile,
  WriteFile,
} from "./models.js";

export function scope() {
  return "/file";
}

export type read_file_input = Sessioned<{
  path: { scope: rust.String };
  query: ReadFile;
}>;
export type read_file_output = File;
export async function read_file(
  input: read_file_input
): Promise<read_file_output> {
  return SessionGet(input, scope(), (path) => `/read_file/${path.scope}`);
}

export type write_file_input = Sessioned<{
  path: { scope: rust.String };
  data: WriteFile;
}>;
export type write_file_output = void;
export async function write_file(
  input: write_file_input
): Promise<write_file_output> {
  return SessionPost(input, scope(), (path) => `/write_file/${path.scope}`);
}

export type remove_file_input = Sessioned<{
  path: { scope: rust.String };
  data: RemoveFile;
}>;
export type remove_file_output = void;
export async function remove_file(
  input: remove_file_input
): Promise<remove_file_output> {
  return SessionPost(input, scope(), (path) => `/remove_file/${path.scope}`);
}

export type read_directory_input = Sessioned<{
  path: { scope: rust.String };
  query: ReadDirectory;
}>;
export type read_directory_output = Directory;
export async function read_directory(
  input: read_directory_input
): Promise<read_directory_output> {
  return SessionGet(input, scope(), (path) => `/read_directory/${path.scope}`);
}

export type create_directory_input = Sessioned<{
  path: { scope: rust.String };
  data: CreateDirectory;
}>;
export type create_directory_output = void;
export async function create_directory(
  input: create_directory_input
): Promise<create_directory_output> {
  return SessionPost(
    input,
    scope(),
    (path) => `/create_directory/${path.scope}`
  );
}

export type remove_directory_input = Sessioned<{
  path: { scope: rust.String };
  data: RemoveDirectory;
}>;
export type remove_directory_output = void;
export async function remove_directory(
  input: remove_directory_input
): Promise<remove_directory_output> {
  return SessionPost(
    input,
    scope(),
    (path) => `/remove_directory/${path.scope}`
  );
}
