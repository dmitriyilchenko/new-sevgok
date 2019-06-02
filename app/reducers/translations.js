import { SET_TRANSLATIONS } from '../constants/actionsTypes/translations';


const initialState = { etag: null, data: {} };

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TRANSLATIONS:
      return {
        etag: action.payload.etag,
        data: action.payload.data || {}
      };
    default: return state;
  }
}
