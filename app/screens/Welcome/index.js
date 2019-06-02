import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';
import i18n from '../../i18n';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { signIn, signOut } from '../../actions/auth';


class Welcome extends Component {
  render() {
    const { user } = this.props;

    return (
      <View style={styles.container}>
        <Icon name='heart' />
        <Text style={styles.welcome}>{`${i18n.t('welcome')}, ${user ?.name || 'guest'}`}</Text>
        <Button
          label={user ? 'Sign Out' : i18n.t('ui.sign_in')}
          onPress={() => user ? this.props.signOut() : this.props.signIn({ name: 'user' })}
        />
      </View>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user
  };
}

export default connect(mapStateToProps, { signIn, signOut })(Welcome);
