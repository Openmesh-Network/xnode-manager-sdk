use serde::{Deserialize, Serialize};

use crate::utils::Output;

pub type RequestId = u32;

#[derive(Serialize, Deserialize, Debug)]
pub struct RequestIdResponse {
    pub request_id: RequestId,
}

#[derive(Serialize, Deserialize, Debug)]
pub enum RequestIdResult {
    Success { body: Option<String> },
    Error { error: String },
}

#[derive(Serialize, Deserialize, Debug)]
pub struct RequestInfo {
    pub commands: Vec<String>,
    pub result: Option<RequestIdResult>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct CommandInfo {
    pub command: String,
    pub stdout: Output,
    pub stderr: Output,
    pub result: Option<String>,
}
