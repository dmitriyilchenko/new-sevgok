import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles';


class Button extends Component {

  render() {
    const { label, width, backgroundColor } = this.props;
    const customContainerStyles = { width, backgroundColor }

    return (
      <TouchableOpacity
        style={[styles.container, customContainerStyles]}
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
  width: 100,
  onPress: () => null,
  backgroundColor: 'red',
};
