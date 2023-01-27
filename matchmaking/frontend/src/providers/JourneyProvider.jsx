import { createContext } from "react";

import { initialState, reducer } from "../services/journey/journeyReducer";
import BaseProvider from "./BaseProvider";

export const JourneyContext = createContext(initialState);

function JourneyProvider({ children }) {
  return (
    <BaseProvider
      Context={JourneyContext}
      initialState={initialState}
      reducer={reducer}
    >
      {children}
    </BaseProvider>
  );
}

export default JourneyProvider;
