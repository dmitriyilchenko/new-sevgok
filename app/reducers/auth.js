import { SIGN_IN, UPDATE, SIGN_OUT } from '../constants/actionsTypes/auth';


const initialState = {
  user: null
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN: {
      return {
        ...state,
        user: action.user
      };
    }
    case UPDATE: {
      return {
        ...state,
        user: action.user
      };
    }
    case SIGN_OUT: {
      return {
        ...state,
        user: null
      };
    }
    default: return state;
  }
}
