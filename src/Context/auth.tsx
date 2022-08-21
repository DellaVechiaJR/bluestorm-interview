import { createContext, useReducer } from "react";
import { authInitialState, authReducer, authType } from './authReducer'
import { reducerActionType } from "./reducerActionType";

type authInicialStateType = {
  user: authType
}

interface Props {
  children: React.ReactNode;
}

type ContextType = {
  state: authInicialStateType
  dispatch: React.Dispatch<any>
}


const inicialState = {
  user: authInitialState
}

export const Context = createContext<ContextType>({
  state: inicialState,
  dispatch: () => null
})

const mainReducer = (state: authInicialStateType, action: reducerActionType) => ({
  user: authReducer(state.user, action)
})

export const AuthProvider: React.FC<Props> = ({ children }) => {
  
  const [state, dispatch] = useReducer(mainReducer, inicialState)
  
  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  )
}

