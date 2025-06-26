use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct OSChange {
    pub flake: Option<String>,
    pub update_inputs: Option<Vec<String>>,

    pub xnode_owner: Option<String>,
    pub domain: Option<String>,
    pub acme_email: Option<String>,
    pub user_passwd: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct OSConfiguration {
    pub flake: String,
    pub flake_lock: String,

    pub xnode_owner: Option<String>,
    pub domain: Option<String>,
    pub acme_email: Option<String>,
    pub user_passwd: Option<String>,
}
