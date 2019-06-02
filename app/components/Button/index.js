import React, { Component } from 'react';
import { Text, ActivityIndicator, TouchableOpacity } from 'react-native';

import styles from './styles';


class Button extends Component {

  render() {
    const {
      label,
      width,
      loading,
      disabled,
      backgroundColor
    } = this.props;
    const customContainerStyles = { width, backgroundColor }

    return (
      <TouchableOpacity
        disabled={disabled}
        style={[styles.container, customContainerStyles]}
        onPress={() => this.props.onPress()}
      >
        {loading ? <ActivityIndicator /> : <Text>{label}</Text>}
      </TouchableOpacity>
    );
  }
}

export default Button;

Button.defaultProps = {
  label: '',
  width: 100,
  loading: false,
  disabled: false,
  onPress: () => null,
  backgroundColor: 'red',
};
