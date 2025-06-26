use serde::{Deserialize, Serialize};

use crate::utils::Output;

#[derive(Serialize, Deserialize, Debug)]
pub struct SystemCtlProcess {
    pub unit: String,
    pub description: String,
    pub sub: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Process {
    pub name: String,
    pub description: Option<String>,
    pub running: bool,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct LogQuery {
    pub max: Option<u32>,
    pub level: Option<LogLevel>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Log {
    pub timestamp: u64, // Epoch time in Microseconds
    pub message: Output,
    pub level: LogLevel,
}

#[derive(Serialize, Deserialize, Debug)]
pub enum LogLevel {
    Error,
    Warn,
    Info,
    Unknown,
}

#[derive(Serialize, Deserialize, Debug)]
pub enum ProcessCommand {
    Start,
    Stop,
    Restart,
}
