import { Navigation } from 'react-native-navigation';

import i18n from './i18n';
import { store, load } from './store';
import { registerScreens } from './screens';
import Navigator from './utils/Navigator';
import { defaultOptions } from './constants/navigation';
import { checkTranslations } from './actions/translations';


export default class App {

  constructor() {
    i18n.locale = 'en';
  }

  async setRoot(isAuthorized) {
    await Navigator.setRoot(isAuthorized ? 'Welcome' : 'SignIn');
  }

  async onAppLaunched() {
    const state = await load(store);
    const initState = state.auth ? state : store.getState()
    const { user } = initState.auth;
    const isAuthorized = !!user;

    await checkTranslations();
    console.log(initState);
    await Navigation.setDefaultOptions(defaultOptions);
    await this.setRoot(isAuthorized);
  }

  async start() {
    registerScreens();

    Navigation.events().registerAppLaunchedListener(() => this.onAppLaunched());
  }
}
