use serde::{Deserialize, Serialize};

use crate::utils::Output;

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct ReadFile {
    pub path: String,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct WriteFile {
    pub path: String,
    pub content: Vec<u8>,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct RemoveFile {
    pub path: String,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct ReadDirectory {
    pub path: String,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct CreateDirectory {
    pub path: String,
    pub make_parent: bool,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct RemoveDirectory {
    pub path: String,
    pub make_empty: bool,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct File {
    pub content: Output,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct Directory {
    pub directories: Vec<String>,
    pub files: Vec<String>,
    pub symlinks: Vec<String>,
    pub unknown: Vec<String>,
}
