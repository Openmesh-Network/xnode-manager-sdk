use reqwest::Client;
use serde::{Deserialize, Serialize};

use crate::utils::{Empty, Session, SessionPostInput, SessionPostOutput, session_post};

pub fn scope() -> String {
    "/xnode-auth".to_string()
}

#[derive(Serialize, Deserialize, Debug)]
pub struct User {
    user: String,
    signature: Option<String>,
    timestamp: Option<String>,
}
impl User {
    pub fn new(user: String) -> Self {
        Self {
            user,
            signature: None,
            timestamp: None,
        }
    }

    pub fn with_signature(user: String, signature: String, timestamp: String) -> Self {
        Self {
            user,
            signature: Some(signature),
            timestamp: Some(timestamp),
        }
    }
}
#[derive(Debug)]
pub struct LoginInput {
    pub base_url: String,
    pub user: User,
}
pub type LoginOutput = Result<Session, reqwest::Error>;
pub async fn login(input: LoginInput) -> LoginOutput {
    let client = Client::builder().cookie_store(true).build()?;

    client
        .post(format!("{}{}/api/login", input.base_url, scope()))
        .json(&input.user)
        .send()
        .await?;

    Ok(Session {
        reqwest_client: client,
        base_url: input.base_url,
    })
}

pub type LogoutInput<'a> = SessionPostInput<'a, Empty, Empty>;
pub type LogoutOutput = Empty;
pub async fn logout(input: LogoutInput<'_>) -> SessionPostOutput<LogoutOutput> {
    session_post(input, scope(), |_path| "/api/logout").await
}
