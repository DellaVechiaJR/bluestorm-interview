import { reducerActionType } from "./reducerActionType"

export type authType = {
  token: string
}

export const authInitialState:authType = {
  token: ''
}


export const authReducer = (state: authType, action: reducerActionType) => {
  
  switch(action.type){
    case 'CHANGE_TOKEN':
      return {...state, token: action.payload.token}
    break;
  }

  return state
}