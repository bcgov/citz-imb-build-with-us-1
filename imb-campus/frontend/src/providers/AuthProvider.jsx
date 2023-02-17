import { createContext } from "react";

import { initialState, reducer } from "../services/auth/authReducer";
import BaseProvider from "./BaseProvider";

export const AuthContext = createContext(initialState);

function AuthProvider({ children }) {
  return (
    <BaseProvider
      Context={AuthContext}
      initialState={initialState}
      reducer={reducer}
    >
      {children}
    </BaseProvider>
  );
}

export default AuthProvider;
