import { GET_USERS } from "./userActions";

export const initialState = {};

export function reducer(state, action) {
  switch (action.type) {
    case GET_USERS:
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
}
