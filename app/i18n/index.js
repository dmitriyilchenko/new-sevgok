import I18n from 'react-native-i18n';

import en from './locales/en';
import da from './locales/da';


I18n.fallbacks = true;

I18n.translations = { en, da };

export default I18n;
