import { combineReducers } from 'redux'

import auth from './auth';
import translations from './translations';


export default combineReducers({ auth, translations });
