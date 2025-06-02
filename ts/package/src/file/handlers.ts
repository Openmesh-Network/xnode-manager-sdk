import * as rust from "../utils/rust-types.js";

import type { Session } from "../utils/session.js";
import type { Directory, File } from "./models.js";

export function scope() {
  return "/file";
}

export async function read_file({
  session,
  location,
}: {
  session: Session;
  location: {
    container: rust.String;
    path: rust.String;
  };
}): Promise<File> {
  return session.axiosInstance
    .post(`${session.baseUrl}${scope()}/read_file`, {
      location,
    })
    .then((res) => res.data as File);
}

export async function write_file({
  session,
  location,
  content,
}: {
  session: Session;
  location: {
    container: rust.String;
    path: rust.String;
  };
  content: rust.u8[];
}): Promise<void> {
  await session.axiosInstance.post(`${session.baseUrl}${scope()}/write_file`, {
    location,
    content,
  });
}

export async function remove_file({
  session,
  location,
}: {
  session: Session;
  location: {
    container: rust.String;
    path: rust.String;
  };
}): Promise<void> {
  return session.axiosInstance.post(
    `${session.baseUrl}${scope()}/remove_file`,
    {
      location,
    }
  );
}

export async function read_directory({
  session,
  location,
}: {
  session: Session;
  location: {
    container: rust.String;
    path: rust.String;
  };
}): Promise<Directory> {
  return session.axiosInstance
    .post(`${session.baseUrl}${scope()}/read_directory`, {
      location,
    })
    .then((res) => res.data as Directory);
}

export async function create_directory({
  session,
  location,
  make_parent,
}: {
  session: Session;
  location: {
    container: rust.String;
    path: rust.String;
  };
  make_parent: rust.bool;
}): Promise<void> {
  return session.axiosInstance.post(
    `${session.baseUrl}${scope()}/remove_directory`,
    {
      location,
      make_parent,
    }
  );
}

export async function remove_directory({
  session,
  location,
  make_empty,
}: {
  session: Session;
  location: {
    container: rust.String;
    path: rust.String;
  };
  make_empty: rust.bool;
}): Promise<void> {
  return session.axiosInstance.post(
    `${session.baseUrl}${scope()}/remove_directory`,
    {
      location,
      make_empty,
    }
  );
}
