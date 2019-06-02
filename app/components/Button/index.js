import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles';


class Button extends Component {

  render() {
    const { label } = this.props;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.onPress()}
      >
        <Text>{label}</Text>
      </TouchableOpacity>
    );
  }
}

export default Button;

Button.defaultProps = {
  label: '',
  onPress: () => null
};
