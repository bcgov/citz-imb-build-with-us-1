import React from "react";
import { useReducer } from "react";

/**
 * @description This component is a generic React context provider, designed to keep the creation of providers "D.R.Y.".
 *              This component makes use of React's useReducer hook which allows for Redux-esque data management.
 *
 * @link [React useReducer Explanation](https://dmitripavlutin.com/react-usereducer/)
 *
 * @author Zach Bourque <Zachary.Bourque@gov.bc.ca>
 * @param Context The context of the given piece of state, this is what gets returned from React.useContext
 * @param reducer The reducer for the piece of state.
 * @param initialState The initial values for the piece of state.
 * @param children The child component of this component
 *
 *
 * @example
 * <Counter initialValue={10} />
 */

const BaseProvider = ({ Context, reducer, initialState, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default BaseProvider;
