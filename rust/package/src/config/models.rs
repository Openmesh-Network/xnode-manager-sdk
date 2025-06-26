use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct ContainerConfiguration {
    pub flake: String,
    pub flake_lock: Option<String>,
    pub network: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContainerSettings {
    pub flake: String,
    pub network: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ContainerChange {
    pub settings: ContainerSettings,
    pub update_inputs: Option<Vec<String>>,
}
