use reqwest::{
    Body, Client, Response,
    header::{CONTENT_TYPE, HeaderValue},
};
use serde::{Serialize, de::DeserializeOwned};
use serde_json::to_value;

#[derive(Debug)]
pub struct Session {
    pub reqwest_client: Client,
    pub base_url: String,
}

pub trait ResponseData<T: Sized> {
    fn from_response(response: Response) -> impl Future<Output = Result<T, Error>>;
}
impl<Data: DeserializeOwned> ResponseData<Data> for Data {
    async fn from_response(response: Response) -> Result<Self, Error> {
        serde_json::from_slice(&response.bytes().await.map_err(Error::ReqwestError)?)
            .map_err(Error::SerdeJsonError)
    }
}

pub trait QueryData {
    fn create_query(&self) -> Result<Vec<(String, String)>, Error>;
}
impl<Data: Serialize> QueryData for Data {
    fn create_query(&self) -> Result<Vec<(String, String)>, Error> {
        Ok(to_value(self)
            .map_err(Error::SerdeJsonError)?
            .as_object()
            .map(|x| {
                x.into_iter()
                    .filter_map(|(key, value)| match value {
                        serde_json::Value::String(s) => Some((key.clone(), s.clone())),
                        serde_json::Value::Number(n) => Some((key.clone(), n.to_string())),
                        _ => None,
                    })
                    .collect()
            })
            .unwrap_or(vec![]))
    }
}

pub trait BodyData {
    fn create_body(&self) -> Result<Body, Error>;
}
impl<Data: Serialize> BodyData for Data {
    fn create_body(&self) -> Result<Body, Error> {
        Ok(serde_json::to_vec(&self)
            .map_err(Error::SerdeJsonError)?
            .into())
    }
}

#[derive(Default)]
pub struct Empty {}
impl ResponseData<Empty> for Empty {
    async fn from_response(_response: Response) -> Result<Self, Error> {
        Ok(Self {})
    }
}
impl QueryData for Empty {
    fn create_query(&self) -> Result<Vec<(String, String)>, Error> {
        Ok(vec![])
    }
}
impl BodyData for Empty {
    fn create_body(&self) -> Result<Body, Error> {
        Ok(Body::default())
    }
}

#[derive(Debug)]
pub struct SessionGetInput<'a, Path, Query: QueryData> {
    pub session: &'a Session,
    pub path: Path,
    pub query: Query,
}
pub type SessionGetOutput<Output> = Result<Output, Error>;
#[derive(Debug)]
pub struct SessionPostInput<'a, Path, Data: BodyData> {
    pub session: &'a Session,
    pub path: Path,
    pub data: Data,
}
pub type SessionPostOutput<Output> = Result<Output, Error>;
#[derive(Debug)]
pub enum Error {
    XnodeManagerSDKError,
    ReqwestError(reqwest::Error),
    SerdeJsonError(serde_json::Error),
}

impl<'a> SessionGetInput<'a, Empty, Empty> {
    pub fn new(session: &'a Session) -> Self {
        Self {
            session,
            path: Empty::default(),
            query: Empty::default(),
        }
    }
}
impl<'a, Path> SessionGetInput<'a, Path, Empty> {
    pub fn new_with_path(session: &'a Session, path: Path) -> Self {
        Self {
            session,
            path,
            query: Empty::default(),
        }
    }
}
impl<'a, Query: Serialize> SessionGetInput<'a, Empty, Query> {
    pub fn new_with_query(session: &'a Session, query: Query) -> Self {
        Self {
            session,
            path: Empty::default(),
            query,
        }
    }
}

impl<'a> SessionPostInput<'a, Empty, Empty> {
    pub fn new(session: &'a Session) -> Self {
        Self {
            session,
            path: Empty::default(),
            data: Empty::default(),
        }
    }
}
impl<'a, Path> SessionPostInput<'a, Path, Empty> {
    pub fn new_with_path(session: &'a Session, path: Path) -> Self {
        Self {
            session,
            path,
            data: Empty::default(),
        }
    }
}
impl<'a, Data: Serialize> SessionPostInput<'a, Empty, Data> {
    pub fn new_with_data(session: &'a Session, data: Data) -> Self {
        Self {
            session,
            path: Empty::default(),
            data,
        }
    }
}

pub async fn session_get<
    Output: ResponseData<Output>,
    Path,
    Query: QueryData,
    PathOutput: Into<String>,
>(
    input: SessionGetInput<'_, Path, Query>,
    scope: String,
    path: fn(Path) -> PathOutput,
) -> SessionGetOutput<Output> {
    let session = input.session;
    Output::from_response(
        session
            .reqwest_client
            .get(format!(
                "{}{}{}",
                session.base_url,
                scope,
                path(input.path).into()
            ))
            .query(&input.query.create_query()?)
            .send()
            .await
            .map_err(Error::ReqwestError)?,
    )
    .await
}

pub async fn session_post<
    Output: ResponseData<Output>,
    Path,
    Data: BodyData,
    PathOutput: Into<String>,
>(
    input: SessionPostInput<'_, Path, Data>,
    scope: String,
    path: fn(Path) -> PathOutput,
) -> SessionPostOutput<Output> {
    let session = input.session;
    Output::from_response(
        session
            .reqwest_client
            .post(format!(
                "{}{}{}",
                session.base_url,
                scope,
                path(input.path).into()
            ))
            .header(CONTENT_TYPE, HeaderValue::from_static("application/json"))
            .body(input.data.create_body()?)
            .send()
            .await
            .map_err(Error::ReqwestError)?,
    )
    .await
}
