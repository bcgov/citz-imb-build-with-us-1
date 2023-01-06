import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import Keycloak from "keycloak-js";

// Create a context to share the Keycloak adapter
const KeycloakContext = createContext();

const keycloakConfig = {
  url: "https://dev.loginproxy.gov.bc.ca/auth",
  realm: "standard",
  clientId: "im-boarding-4457",
};

// Provider component that wraps your application and provides the Keycloak instance
function AuthProvider({ children, config = keycloakConfig }) {
  const [keycloak, setKeycloak] = useState();

  // Initialize Keycloak instance asynchronously
  useEffect(() => {
    (async () => {
      const kc = new Keycloak(keycloakConfig);
      await kc.init({
        pkceMethod: "S256",
        redirectUri: location.href,
      });
      setKeycloak(kc);
    })();
  }, []);

  // Provide the Keycloak instance to the context
  return (
    <KeycloakContext.Provider value={keycloak}>
      {/* TODO: Add a spinner icon if keycloak is not initialized */}
      {keycloak ? children : ""}
    </KeycloakContext.Provider>
  );
}

/**
 * @description Provides children of the AuthProvider with the Keycloak instance
 *
 * @returns The current Keycloak adapter instance
 */
function useKeycloak() {
  const keycloak = useContext(KeycloakContext);
  if (!keycloak) {
    throw new Error("Keycloak instance not found in context");
  }
  return keycloak;
}

/**
 * @description Allows children of the AuthProvider to use the currently logged in user's data
 *
 * @returns DecodedJWT | undefined
 */
function useAuth() {
  const { tokenParsed } = useContext(KeycloakContext);

  return tokenParsed;
}

export { AuthProvider, useAuth, useKeycloak };
