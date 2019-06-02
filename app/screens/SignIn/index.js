import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

import styles from './styles';
import i18n from '../../i18n';
import Button from '../../components/Button';
import { signIn, signOut } from '../../actions/auth';
import { email as emailRegExp } from '../../constants/regexp';


class SignIn extends Component {

  state = { email: '', isValid: false };

  onChangeEmail(email) {
    const isValid = emailRegExp.test(email);
    this.setState({email, isValid});
  }

  onConfirm() {
    const { email, isValid } = this.state;

    if(isValid) this.props.signIn(email)
  }

  render() {
    const { email, isValid } = this.state;

    return (
      <View style={styles.container}>
        <Text>{i18n.t('sign_in.title')}</Text>
        <TextInput
          value={email}
          style={styles.input}
          autoCapitalize='none'
          keyboardType='email-address'
          onChangeText={(val) => this.onChangeEmail(val)}
        />
        <Button
          width={200}
          label={i18n.t('sign_in.login_button')}
          backgroundColor={isValid ? 'green' : 'red'}
          onPress={() => this.onConfirm()}
        />
      </View>
    );
  }
}

export default connect(null, { signIn, signOut })(SignIn);
