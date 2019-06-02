import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import i18n from '../../i18n';
import Button from '../../components/Button';
import { signIn, signOut } from '../../actions/auth';


class FindOrder extends Component {

  render() {

    return (
      <View style={styles.container}>
        <Text>FindOrder</Text>
      </View>
    );
  }
}

export default FindOrder;
