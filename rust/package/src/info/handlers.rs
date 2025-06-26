use crate::{
    info::models::{Flake, FlakeQuery},
    utils::{Empty, SessionGetInput, SessionGetOutput, session_get},
};

pub fn scope() -> String {
    "/info".to_string()
}

pub type FlakeInput<'a> = SessionGetInput<'a, Empty, FlakeQuery>;
pub type FlakeOutput = Flake;
pub async fn flake(input: FlakeInput<'_>) -> SessionGetOutput<FlakeOutput> {
    session_get(input, scope(), |_path| "/flake").await
}
