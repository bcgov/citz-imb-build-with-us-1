import { useContext, useMemo } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { GET_TOKEN } from "./authActions";
import decodeJWT from "../../utils/decodeJWT";
import useUserService from "../users/useUserService";

export default function useAuthService() {
  const { state, dispatch } = useContext(AuthContext);

  return useMemo(() => {
    const getLoginURL = () => process.env.VITE_BASE_API_URL + "/oauth/login";

    const getLogoutURL = () => process.env.VITE_BASE_API_URL + "/oauth/logout";

    const setUserInfo = (token) => {
      const decodedToken = decodeJWT(token);
      dispatch({
        type: GET_TOKEN,
        payload: { accessToken: token, userInfo: decodedToken },
      });
    };

    const getNewToken = () => {
      //TODO: Make request to backend /token endpoint to recieve a new token.
    };

    return {
      getLoginURL,
      getLogoutURL,
      setUserInfo,
      state,
    };
  }, [state]);
}
