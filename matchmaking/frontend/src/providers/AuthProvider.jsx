import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import Keycloak from "keycloak-js";

// Create a context to share the Keycloak instance
const AuthContext = createContext();
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
    const initializeKeycloak = async () => {
      const kc = Keycloak(keycloakConfig);
      await kc.init();
      setKeycloak(kc);
    };
    initializeKeycloak();
  }, []);

  // Provide the Keycloak instance to the context
  return (
    <AuthContext.Provider value={keycloak}>{children}</AuthContext.Provider>
  );
}

// Hook that returns the Keycloak instance from the context
function useKeycloak() {
  const keycloak = useContext(AuthContext);
  if (!keycloak) {
    throw new Error("Keycloak instance not found in context");
  }
  console.log(keycloak);
  return keycloak;
}

function useAuth() {
  const keycloak = useContext(AuthContext);
  if (!keycloak) {
    throw new Error("Keycloak instance not found in context");
  }
  return keycloak;
}

export { AuthProvider, useKeycloak };
