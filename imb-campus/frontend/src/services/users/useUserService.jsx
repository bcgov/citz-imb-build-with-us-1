import { useContext, useMemo } from "react";
import { UserContext } from "../../providers/UserProvider";
import { GET_USERS } from "./userActions";
import useAuthService from "../auth/useAuthService";

function useUserService() {
  const { state, dispatch } = useContext(UserContext);

  return useMemo(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(`${process.env.VITE_BASE_API_URL}/users`);
        const data = await res.json();
        dispatch({ type: GET_USERS, payload: data });
      } catch (e) {
        console.error(e);
      }
    };

    return {
      getUsers,
      state,
    };
  }, [state, dispatch]);
}

export default useUserService;
