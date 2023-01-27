import { useContext, useMemo } from "react";
import { JourneyContext } from "../../providers/JourneyProvider";
import { api } from "../../utils/requestWrapper";
import { GET_USERS_JOURNEYS } from "./journeyActions";

export default function useJourneyService() {
  const { state, dispatch } = useContext(JourneyContext);

  return useMemo(() => {
    const getUsersJourneys = () => {
      try {
        //TODO: Add username/guid to end of this api call once keycloak is in place.
        const res = api.get(`/journeys/`);
        dispatch({ type: GET_USERS_JOURNEYS, payload: res.data });
      } catch (e) {}
    };

    return {
      getUsersJourneys,
      state,
    };
  }, [state]);
}
