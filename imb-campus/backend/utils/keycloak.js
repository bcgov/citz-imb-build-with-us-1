const axios = require("axios");
const qs = require("qs");

const {
  SSO_CLIENT_ID,
  SSO_CLIENT_SECRET,
  OIDC_AUTHORIZATION_URL,
  OIDC_TOKEN_URL,
  OIDC_USER_INFO_URL,
  OIDC_LOGOUT_URL,
  OIDC_GRANT_TYPE,
  OIDC_REDIRECT_URL,
  OIDC_RESPONSE_TYPE,
  OIDC_SCOPE,
  OIDC_LOGOUT_REDIRECT_URL,
  OIDC_INTROSPECT_URL,
} = require("../config");

const btoa = (string) => Buffer.from(string).toString("base64");

const decodeValue = (base64String) => {
  try {
    return JSON.parse(Buffer.from(base64String, "base64").toString("ascii"));
  } catch {
    return "";
  }
};

const decodingJWT = (token) => {
  if (!token) return null;

  const [header, payload] = token.split(".");

  return {
    header: decodeValue(header),
    payload: decodeValue(payload),
  };
};

// see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.1
const getAuthorizationUrl = async (baseURL) => {
  const params = {
    client_id: SSO_CLIENT_ID,
    response_type: OIDC_RESPONSE_TYPE,
    scope: OIDC_SCOPE,
    redirect_uri: baseURL + OIDC_REDIRECT_URL,
  };

  return `${OIDC_AUTHORIZATION_URL}?${qs.stringify(params, { encode: false })}`;
};

// see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.3
const getAccessToken = async ({ code, baseURL }) => {
  const url = OIDC_TOKEN_URL;
  const params = {
    grant_type: OIDC_GRANT_TYPE,
    client_id: SSO_CLIENT_ID,
    redirect_uri: baseURL + OIDC_REDIRECT_URL,
    code,
  };

  const config = {
    url,
    method: "POST",
    data: qs.stringify(params),
  };
  if (SSO_CLIENT_SECRET) {
    config.headers = {
      Authorization: `Basic ${btoa(`${SSO_CLIENT_ID}:${SSO_CLIENT_SECRET}`)}`,
    };
  }

  const { data } = await axios(config);

  const { id_token, access_token, refresh_token } = data;

  // Decode tokens to get user information
  data.id_token_decoded = decodingJWT(id_token);

  data.access_token_decoded = decodingJWT(access_token);

  data.refresh_token_decoded = decodingJWT(refresh_token);

  return data;
};

const getUserInfo = async ({ accessToken }) => {
  const { data } = await axios({
    url: OIDC_USER_INFO_URL,
    method: "get",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

const getLogoutUrl = (baseURL) => {
  const params = {
    client_id: SSO_CLIENT_ID,
    redirect_uri: baseURL + OIDC_LOGOUT_REDIRECT_URL,
  };

  return `${OIDC_LOGOUT_URL}?${qs.stringify(params, { encode: false })}`;
};

const isJWTValid = async (jwt) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/x-www-form-urlencoded",
  };

  let bodyContent = `client_id=${SSO_CLIENT_ID}&client_secret=${SSO_CLIENT_SECRET}&token=${jwt}`;

  let response = await fetch(OIDC_INTROSPECT_URL, {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  return data.active;
};

const getUserData = (accessToken) => {
  const data = decodingJWT(accessToken);
  if (data) {
    return data.payload;
  }
  return null;
};

module.exports = {
  getAuthorizationUrl,
  getAccessToken,
  getUserInfo,
  getLogoutUrl,
  isJWTValid,
  getUserData,
};
