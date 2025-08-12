use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct ContainerConfiguration {
    pub flake: String,
    pub flake_lock: Option<String>,
    pub network: Option<String>,
    pub nvidia_gpus: Option<Vec<u64>>,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct ContainerSettings {
    pub flake: String,
    pub network: Option<String>,
    pub nvidia_gpus: Option<Vec<u64>>,
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct ContainerChange {
    pub settings: ContainerSettings,
    pub update_inputs: Option<Vec<String>>,
}
