import { createContext, useEffect, useMemo, useReducer } from "react";
import UserReducer from "./UserReducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false
}

export const UserContext = createContext(INITIAL_STATE);

export const UserContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

  const contextValue = useMemo(() => ({
    user: state.user,
    isFetching: state.isFetching,
    error: state.error,
    dispatch,
  }), [state.user, state.isFetching, state.error]);

  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user]);

  return (
    <UserContext.Provider value={ contextValue }>
      { children /* Child for this instance would be App */ }  
    </UserContext.Provider>
  )
}