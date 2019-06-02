import firebase from 'firebase';

import User from '../firebase/User';
import { SIGN_IN, SIGN_OUT } from '../constants/actionsTypes/auth';


export function signIn(user) {
  
  const newUser = { email: 'hello@hello.com', name: 'Alex1', phone: 12912912 };
  User.createUser(newUser);

  return {
    user,
    type: SIGN_IN
  };
}

export function signOut(user) {
  User.findUser('hello@hello.com');
  return {
    type: SIGN_OUT
  };
}
