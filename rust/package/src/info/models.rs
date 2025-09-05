use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct FlakeQuery {
    pub flake: String,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct Flake {
    pub last_modified: u64,
    pub revision: String,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct User {
    pub name: String,
    pub id: u32,
    pub group: u32,
    pub description: String,
    pub home: String,
    pub login: String,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct Group {
    pub name: String,
    pub id: u32,
    pub members: Vec<String>,
}
