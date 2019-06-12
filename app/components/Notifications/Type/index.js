import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles';
import i18n from '../../../i18n';


function Type(props) {
  const { label, onPress, disabled } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, disabled && styles.disabled]}
    >
      <Text style={styles.label}>{i18n.t(`notification_types.${label}`)}</Text>
    </TouchableOpacity>
  );
}

export default Type;

Type.defaultProps = {
  label: '',
  disabled: false,
  onPress: () => null
};