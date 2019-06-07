import React, { Component } from 'react';
import { Text, ActivityIndicator, TouchableOpacity } from 'react-native';

import styles from './styles';


class Button extends Component {

  render() {
    const {
      label,
      width,
      style,
      loading,
      disabled,
      backgroundColor,
      disabledBackgroundColor
    } = this.props;
    const customContainerStyles = { width, backgroundColor: disabled ? disabledBackgroundColor : backgroundColor, ...style }

    return (
      <TouchableOpacity
        disabled={disabled}
        style={[styles.container, customContainerStyles]}
        onPress={() => this.props.onPress()}
      >
        {loading ? <ActivityIndicator color='white' /> : <Text style={styles.label}>{label}</Text>}
      </TouchableOpacity>
    );
  }
}

export default Button;

Button.defaultProps = {
  style: {},
  label: '',
  width: 100,
  loading: false,
  disabled: false,
  onPress: () => null,
  backgroundColor: '#4CAF50',
  disabledBackgroundColor: '#9E9E9E'
};
