import _ from 'lodash';
import { connect } from 'react-redux';
import React, { Component } from 'react'
import {
  View,
  Text,
  Keyboard,
  LayoutAnimation,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native'
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';


const layoutAnimationConfig = {
  duration: 350,
  create: { type: 'easeIn', property: 'opacity' },
  update: { type: 'spring', springDamping: 0.8 },
  delete: { type: 'easeIn', property: 'opacity', duration: 200 },
};

class Popup extends Component {

  state = { step: 0 };

  onConfirm() {

  }

  closeModal() {
    this.props.onModalToggle(false);
    LayoutAnimation.configureNext(layoutAnimationConfig)
  }

  hideOrBack = () => {
    const { step } = this.state;

    if (step !== 1) {
      this.closeModal();
    }

    this.setState({ step: 0 });
    LayoutAnimation.configureNext(layoutAnimationConfig)
  }

  render() {
    const { children, visible, height } = this.props;
    const { step } = this.state;

    return (
      <Modal
        coverScreen
        useNativeDriver
        isVisible={visible}
        style={styles.modal}
        onSwipeComplete={this.hideOrBack}
        onBackdropPress={this.hideOrBack}
        onBackButtonPress={this.hideOrBack}
        animationInTiming={450}
        animationOutTiming={600}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAvoidingView style={[styles.container, { minHeight: height }]} behavior='padding' enabled>
            <TouchableOpacity
              style={styles.icon}
              onPress={this.hideOrBack}
            >
              <Icon name={step > 1 ? 'arrow-left' : 'close'} color='black' size={30} />
            </TouchableOpacity>
            {children}
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

Popup.defaultProps = {
  height: 300,
  onModalToggle: () => null
};

export default Popup;
