import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import i18n from '../../i18n';
import Button from '../../components/Button';


class Notifications extends Component {

  render() {

    return (
      <View style={styles.container}>
        <Text>Notifications</Text>
      </View>
    );
  }
}

export default Notifications;
