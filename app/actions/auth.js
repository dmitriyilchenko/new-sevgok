import User from '../firebase/User';
import Navigator from '../utils/Navigator';
import { SIGN_IN, SIGN_OUT } from '../constants/actionsTypes/auth';


export function signIn(email) {
  return async (dispatch) => {  
      const user = await User.getUser(email);

      dispatch({
        user,
        type: SIGN_IN
      });
      
      Navigator.setRoot('Welcome');
      return user;
  }
}

export function signOut() {
  return {
    type: SIGN_OUT
  };
}
