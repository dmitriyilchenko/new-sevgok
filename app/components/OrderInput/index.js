import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';


class OrderInput extends Component {

  onChangeValue(value) {
    this.props.onValueChange(value);
  }

  render() {
    const { value, width, placeholder } = this.props;
    const customContainerStyles = { width };

    return (
      <View style={[styles.container, customContainerStyles]}>
        <TextInput
          value={value}
          placeholder={placeholder}
          keyboardType='number-pad'
          onChangeText={(val) => this.onChangeValue(val)}
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
  placeholder: 'Order id',
  onValueChange: () => null
};
