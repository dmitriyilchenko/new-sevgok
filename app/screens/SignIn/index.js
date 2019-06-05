import _ from 'lodash';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import styles from './styles';
import i18n from '../../i18n';
import User from '../../firebase/User';
import Button from '../../components/Button';
import WarehouseInput from '../../components/WarehouseInput';
import { signIn, signOut } from '../../actions/auth';
import { email as emailRegExp } from '../../constants/regexp';


class SignIn extends Component {

  state = {
    step: 0,
    email: '',
    fullname: '',
    warehouse_id: null,
    valid: false,
    loading: false
  };

  onChangeField(field, value) {
    const { fullname, warehouse_id } = this.state;
    const fullnameValid = fullname.length > 4;
    const warehouseIdValid = !_.isNil(warehouse_id);
    const valid = field === 'email' ? emailRegExp.test(value) : (fullnameValid && warehouseIdValid);

    this.setState({ [field]: value, valid });
  }

  async onLoginPress() {
    const { email } = this.state;

    this.setState({ loading: true });
    const user = await User.getUser(email);

    if (user) {
      this.props.signIn(user.email);
    } else {
      this.setState({ step: 1, valid: false, loading: false });
    }
  }

  async onSignUpPress() {
    const { email, fullname, warehouse_id } = this.state;
    const newUser = { email, fullname, warehouse_id }

    this.setState({ loading: true });
    const user = await User.createUser(newUser);

    this.props.signIn(user.email);
  }

  renderSignInForm() {
    const { email, valid, loading } = this.state;

    return (
      <View>
        <Text style={styles.title}>{i18n.t('sign_in.title')}</Text>
        <TextInput
          value={email}
          style={styles.input}
          autoCapitalize='none'
          keyboardType='email-address'
          onChangeText={(val) => this.onChangeField('email', val)}
        />
        <Button
          width={200}
          disabled={!valid}
          loading={loading}
          onPress={() => this.onLoginPress()}
          label={i18n.t('sign_in.confirm_button')}
          backgroundColor={valid ? '#4CAF50' : '#FF1744'}
        />
      </View>
    );
  }

  renderSignUpForm() {
    const { fullname, warehouse_id, valid, loading } = this.state;

    return (
      <View>
        <TouchableOpacity onPress={() => this.setState({ step: 0, valid: true })}>
          <Text>{i18n.t('sign_up.back')}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{i18n.t('sign_up.title')}</Text>
        <TextInput
          value={fullname}
          style={styles.input}
          placeholder={i18n.t('sign_up.fullname')}
          onChangeText={(val) => this.onChangeField('fullname', val)}
        />
        <WarehouseInput
          width={200}
          label={warehouse_id}
          style={styles.input}
          autoCapitalize='none'
          keyboardType='number-pad'
          placeholder={i18n.t('sign_up.warehouse_id')}
          onValueChange={(val) => this.onChangeField('warehouse_id', val.id)}
        />
        <Button
          width={200}
          disabled={!valid}
          loading={loading}
          onPress={() => this.onSignUpPress()}
          label={i18n.t('sign_up.confirm_button')}
          backgroundColor={valid ? '#4CAF50' : '#FF1744'}
        />
      </View>
    );
  }

  render() {
    const { step } = this.state;

    return (
      <View style={styles.container}>
        {
          step === 0 ? this.renderSignInForm() : this.renderSignUpForm()
        }
      </View>
    );
  }
}

export default connect(null, { signIn, signOut })(SignIn);
