import _ from 'lodash';
import React, { Component } from 'react'
import {
  Keyboard,
  LayoutAnimation,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native'
import Modal from 'react-native-modal';

import styles from './styles';


const layoutAnimationConfig = {
  duration: 350,
  create: { type: 'easeIn', property: 'opacity' },
  update: { type: 'spring', springDamping: 0.8 },
  delete: { type: 'easeIn', property: 'opacity', duration: 200 },
};

class Popup extends Component {

  closeModal() {
    this.props.onModalToggle(false);
    LayoutAnimation.configureNext(layoutAnimationConfig)
  }

  hideOrBack = () => {
    const { step } = this.props;

    if (step !== 1) {
      this.closeModal();
    }

    LayoutAnimation.configureNext(layoutAnimationConfig)
  }

  render() {
    const { children, visible, height } = this.props;

    return (
      <Modal
        coverScreen
        useNativeDriver
        isVisible={visible}
        style={styles.modal}
        propagateSwipe={true}
        onSwipeComplete={this.hideOrBack}
        onBackdropPress={this.hideOrBack}
        onBackButtonPress={this.hideOrBack}
        animationInTiming={450}
        animationOutTiming={600}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAvoidingView style={[styles.container, { minHeight: height }]} behavior='padding' enabled>
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
