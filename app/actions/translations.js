import { Platform } from 'react-native';

import { API_HOST_URL } from '../constants';
import { SET_TRANSLATIONS } from '../constants/actionsTypes/translations';
import { store } from '../store';
import i18n from '../i18n';
import axios from '../utils/axios';


const url = API_HOST_URL + 'translations';

function setTranslations(translations) {
  for (let item in translations) {
    i18n.translations.da[item] = translations[item].da;
    i18n.translations.en[item] = translations[item].en;
  }
}

export async function checkTranslations() {
  try {
    const response = await axios.head(url, { params: { platform: Platform.OS } });
    const { translations } = store.getState();

    if (response.headers.etag === translations.etag) {
      setTranslations(translations.data)
    } else {
      await getTranslations();
    }
  } catch (error) {
    await getTranslations();
  };
};

export async function getTranslations() {
  try {
    const response = await axios.get(url, { params: { platform: Platform.OS } });

    setTranslations(response.data);

    store.dispatch({
      type: SET_TRANSLATIONS,
      payload: {
        data: response.data,
        etag: response.headers.etag
      }
    });
  } catch (error) {
    setTranslations(store.getState().translations.data);
  }
}
