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
