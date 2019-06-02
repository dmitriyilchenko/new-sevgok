import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';
import i18n from '../../i18n';
import Navigator from '../../utils/Navigator';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { signOut } from '../../actions/auth';


class Profile extends Component {

  logout() {
    const cb = () => setTimeout(() => this.props.signOut());
    Navigator.setRoot('SignIn', null, {}, cb);
  }

  render() {
    const { user } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{`${i18n.t('welcome')}, ${user ?.fullname}`}</Text>
        <Button
          label={'Sign Out'}
          onPress={() => this.logout()}
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

export default connect(mapStateToProps, { signOut })(Profile);
