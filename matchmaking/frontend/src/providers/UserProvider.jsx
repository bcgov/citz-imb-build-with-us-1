import { createContext } from "react";
import { initialState, reducer } from "../services/users/userReducer";
import BaseProvider from "./BaseProvider";

export const UserContext = createContext(initialState);

function UserProvider({ children }) {
  return (
    <BaseProvider
      Context={UserContext}
      initialState={initialState}
      reducer={reducer}
    >
      {children}
    </BaseProvider>
  );
}

export default UserProvider;
