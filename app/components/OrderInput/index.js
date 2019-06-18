import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { RNCamera } from 'react-native-camera';

import styles from './styles';
import Popup from '../Popup';


class OrderInput extends Component {

  state = {
    modalVisible: false,
    cameraLoading: false,
    codeReaded: false
  };

  onChangeValue(value) {
    this.props.onValueChange(value);
  }

  onCode(jsonData) {
    if (this.state.codeReaded) return;

    try {
      this.setState({ cameraLoading: true });
      const data = JSON.parse(jsonData);

      this.setState({ modalVisible: false, cameraLoading: false, codeReaded: true });

      if (_.isFunction(this.props.onCode))
        this.props.onCode(data);
      else
        this.onChangeValue(data.number);

    } catch (err) {
      this.setState({ cameraLoading: false });
    }
  }

  renderCamera() {
    if (this.state.cameraLoading)
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size='large' color='black' animating={true} />
        </View>
      );

    return (
      <RNCamera
        ref={ref => { this.camera = ref }}
        style={{ flex: 1, marginBottom: 10 }}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onBarCodeRead={({ data }) => this.onCode(data)}
      />
    );
  }

  render() {
    const { modalVisible } = this.state;
    const { value, width, placeholder, style } = this.props;
    const customContainerStyles = { minWidth: width, maxWidth: width, ...style };

    return (
      <View style={[styles.container, customContainerStyles]}>
        <TextInput
          value={value}
          placeholder={placeholder}
          keyboardType='number-pad'
          onChangeText={(val) => this.onChangeValue(val)}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => this.setState({ codeReaded: false, modalVisible: true })}
        >
          <AwesomeIcon name='qrcode' style={styles.icon} />
        </TouchableOpacity>
        <Popup
          height={400}
          visible={modalVisible}
          step={0}
          onModalToggle={modalVisible => this.setState({ modalVisible, cameraLoading: false })}
        >
          {this.renderCamera()}
        </Popup>
      </View>
    );
  }
}

export default OrderInput;


OrderInput.defaultProps = {
  label: '',
  width: 100,
  maxWidth: 100,
  style: {},
  placeholder: 'Order id',
  onValueChange: () => null
};
