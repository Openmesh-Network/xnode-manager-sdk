use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct FlakeQuery {
    pub flake: String,
}

#[derive(Serialize, Deserialize)]
pub struct Flake {
    pub last_modified: u64,
    pub revision: String,
}
