#[derive(Debug)]
pub enum Error {
    XnodeManagerSDKError(XnodeManagerSDKError),
    ReqwestError(reqwest::Error),
    SerdeJsonError(serde_json::Error),
}

#[derive(Debug)]
pub struct XnodeManagerSDKError {}
