/*
Keycloak allows us to define all endpoint urls with a suffix to
a base URL.  The queries and params following the url are common
to all providers that follow OIDC specs.  This app could be adapted
to a different OIDC provider by altering the .env file and urls the exported
here.
*/

const frontendRef =
  process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_REF
    : `http://${process.env.FRONTEND_REF}:${process.env.FRONTEND_PORT}`;

module.exports = {
  HOSTNAME: process.env.HOST || "localhost",
  PORT: process.env.PORT || 5005,
  SSO_CLIENT_ID: process.env.SSO_CLIENT_ID || "",
  SSO_CLIENT_SECRET: process.env.SSO_CLIENT_SECRET || "",
  OIDC_AUTHORIZATION_URL: `${process.env.SSO_AUTH_SERVER_URL}/auth`,
  OIDC_TOKEN_URL: `${process.env.SSO_AUTH_SERVER_URL}/token`,
  OIDC_INTROSPECT_URL: `${process.env.SSO_AUTH_SERVER_URL}/token/introspect`,
  OIDC_USER_INFO_URL: `${process.env.SSO_AUTH_SERVER_URL}/userinfo`,
  OIDC_LOGOUT_URL: `${process.env.SSO_AUTH_SERVER_URL}/logout`,
  OIDC_GRANT_TYPE: "authorization_code",
  OIDC_REDIRECT_URL: "/oauth/login/callback",
  OIDC_RESPONSE_TYPE: "code",
  OIDC_SCOPE: "email+openid",
  OIDC_LOGOUT_REDIRECT_URL: "/oauth/logout/callback",
  FRONTEND_URL: frontendRef,
};
