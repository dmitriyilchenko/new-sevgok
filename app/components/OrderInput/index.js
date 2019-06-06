import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import Order from '../../firebase/Order';


class OrderInput extends Component {

  state = {
    value: ''
  };

  onChangeValue(value) {
    console.log(value)
    Order.createOrder({ test: true });
    this.setState({ value });
    this.props.onValueChange(value);
  }

  render() {
    const { value } = this.state;
    const { width, placeholder } = this.props;
    const customContainerStyles = { width };

    return (
      <View style={[styles.container, customContainerStyles]}>
        <TextInput
          value={value}
          onChangeText={(val) => this.onChangeValue(val)}
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
