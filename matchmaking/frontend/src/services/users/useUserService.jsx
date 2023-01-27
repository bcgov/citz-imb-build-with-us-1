import { useContext, useMemo } from "react";
import { UserContext } from "../../providers/UserProvider";
import { api } from "../../utils/requestWrapper";
import { GET_USERS } from "./userActions";

function useUserService() {
  const { state, dispatch } = useContext(UserContext);
  return useMemo(() => {
    const getUsers = async () => {
      try {
        const res = await fetch("http://localhost:5005/users").then((res) =>
          res.json()
        );
        dispatch({ type: GET_USERS, payload: res.data });
      } catch (e) {
        console.error("Error occurred");
      }
    };

    return {
      getUsers,
      state,
    };
  }, [state, dispatch]);
}

export default useUserService;
