import React from 'react';
import { Provider } from "react-redux";
import { Navigation } from 'react-native-navigation';


import SignIn from './SignIn';
import Welcome from './Welcome';
import FindOrder from './FindOrder';
import CreateOrder from './CreateOrder';
import { store } from '../store';

const SCREENS = { SignIn, Welcome, FindOrder, CreateOrder };

function WrappedComponent(Component) {
  return function inject(props) {
    const EnhancedComponent = () => (
      <Provider store={store}>
        <Component
          {...props}
        />
      </Provider>
    );

    return <EnhancedComponent />;
  };
}

export function registerScreens() {
  for (let key in SCREENS) {
    Navigation.registerComponent(key, () => WrappedComponent(SCREENS[key]));
  }
}
