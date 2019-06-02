import User from '../firebase/User';
import { SIGN_IN, SIGN_OUT } from '../constants/actionsTypes/auth';


export function signIn(email) {
  return async (dispatch) => {  
      const user = await User.getUser(email);

      dispatch({
        user,
        type: SIGN_IN
      });
      
      return user;
  }
}

export function signOut(user) {
  User.getUser('hello@hello.com');
  return {
    type: SIGN_OUT
  };
}
