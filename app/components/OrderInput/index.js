import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';


class OrderInput extends Component {

  render() {
    const { width, placeholder } = this.props;
    const customContainerStyles = { width };

    return (
      <View style={[styles.container, customContainerStyles]}>
        <TextInput
          placeholder={placeholder}
        />
        <TouchableOpacity style={styles.iconContainer}>
          <AwesomeIcon name='qrcode' style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default OrderInput;


OrderInput.defaultProps = {
  label: '',
  width: 100,
  placeholder: 'Start typing...',
  onValueChange: () => null
};
