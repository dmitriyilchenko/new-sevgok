import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';
import Popup from '../Popup';


class WarehouseInput extends Component {

  state = { modalVisible: false }

  render() {
    const {
      label,
      width,
      disabled,
      placeholder,
    } = this.props;
    const { modalVisible } = this.state;
    const customContainerStyles = { width }

    return (
      <View
        disabled={disabled}
        style={[styles.inputContainer, customContainerStyles]}
      >
        {label ? <Text style={styles.label}>{label}</Text> : <Text style={styles.placeholder}>{placeholder}</Text>}
        <TouchableOpacity
          style={styles.findIconContainer}
          onPress={() => this.setState({ modalVisible: true })}
        >
          <Text>+</Text>
        </TouchableOpacity>
        <Popup onModalToggle={modalVisible => this.setState({ modalVisible })} visible={modalVisible}>
          <Text>Popup</Text>
        </Popup>
      </View>
    );
  }
}

export default WarehouseInput;

WarehouseInput.defaultProps = {
  label: '',
  width: 100,
  loading: false,
  placeholder: 'Start typing...',
  onChange: () => null
};
