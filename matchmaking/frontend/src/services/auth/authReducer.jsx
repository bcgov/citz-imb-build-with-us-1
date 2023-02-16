import decodeJWT from "../../utils/decodeJWT";
import { LOGIN, LOGOUT, SET_TOKEN } from "./authActions";

export const initialState = {
  accessToken: "",
  userInfo: undefined,
};

export function reducer(state, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.payload };
    case LOGOUT:
      return initialState;
    case SET_TOKEN:
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
}
