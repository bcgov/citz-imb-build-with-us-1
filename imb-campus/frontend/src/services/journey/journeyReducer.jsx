import { GET_USERS_JOURNEYS } from "./journeyActions";

export const initialState = {};

export function reducer(state, action) {
  switch (action.type) {
    case GET_USERS_JOURNEYS:
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
}
