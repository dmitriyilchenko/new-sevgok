import { Navigation } from 'react-native-navigation';

import i18n from './i18n';
import { registerScreens } from './screens';
import Navigator from './utils/Navigator';
import { defaultOptions } from './constants/navigation';
import { checkTranslations } from './actions/translations';


export default class App {

  constructor() {
    i18n.locale = 'en';
  }

  async setRoot() {
    await Navigator.setRoot('Welcome');
  }

  async onAppLaunched() {
    await checkTranslations();

    await Navigation.setDefaultOptions(defaultOptions);
    await this.setRoot();
  }

  async start() {
    registerScreens();

    Navigation.events().registerAppLaunchedListener(() => this.onAppLaunched());
  }
}
