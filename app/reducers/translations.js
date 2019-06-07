import { SET_TRANSLATIONS, CHANGE_LANGUAGE } from '../constants/actionsTypes/translations';


const initialState = { language: 'en', etag: null, data: {} };

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TRANSLATIONS:
      return {
        etag: action.payload.etag,
        data: action.payload.data || {}
      };
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.language
      };
    default: return state;
  }
}
