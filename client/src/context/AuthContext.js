import { createContext, useMemo, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const contextValue = useMemo(() => ({
    user: state.user,
    isFetching: state.isFetching,
    error: state.error,
    dispatch,
  }), [state.user, state.isFetching, state.error]);

  return (
    <AuthContext.Provider value={ contextValue }>
      { children /* Child for this instance would be App */ }  
    </AuthContext.Provider>
  )
}