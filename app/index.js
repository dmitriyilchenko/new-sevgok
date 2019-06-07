import { Navigation } from 'react-native-navigation';

import i18n from './i18n';
import { store, load } from './store';
import { registerScreens } from './screens';
import Navigator from './utils/Navigator';
import { defaultOptions } from './constants/navigation';


export default class App {

  async setRoot(isAuthorized) {
    if (isAuthorized)
      await Navigator.setRootWithTabs();
    else
      await Navigator.setRoot('SignIn');
  }

  async onAppLaunched() {
    const state = await load(store);
    const initState = state.auth ? state : store.getState()
    const { user } = initState.auth;
    const { language } = initState.translations;
    const isAuthorized = !!user;

    i18n.locale = language;

    await Navigation.setDefaultOptions(defaultOptions);
    await this.setRoot(isAuthorized);
  }

  async start() {
    registerScreens();

    Navigation.events().registerAppLaunchedListener(() => this.onAppLaunched());
  }
}
