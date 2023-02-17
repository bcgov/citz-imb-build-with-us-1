import { useContext, useMemo } from "react";
import { JourneyContext } from "../../providers/JourneyProvider";
import { GET_USERS_JOURNEYS } from "./journeyActions";

export default function useJourneyService() {
  const { state, dispatch } = useContext(JourneyContext);

  return useMemo(() => {
    const getUsersJourneys = async () => {
      try {
        const res = await fetch(`${process.env.VITE_BASE_API_URL}/journeys`);
        const data = await res.json();
        dispatch({ type: GET_USERS_JOURNEYS, payload: data });
      } catch (e) {
        console.error(e);
      }
    };

    return {
      getUsersJourneys,
      state,
    };
  }, [state]);
}
