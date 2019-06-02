import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import i18n from '../../i18n';
import Button from '../../components/Button';
import { signIn, signOut } from '../../actions/auth';


class SignIn extends Component {

  render() {

    return (
      <View style={styles.container}>
        <Button
          label={i18n.t('ui.sign_in')}
          onPress={() => this.props.signIn('hello@hello.com')}
        />
      </View>
    );
  }
}

export default connect(null, { signIn, signOut })(SignIn);
