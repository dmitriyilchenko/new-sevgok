import React from 'react';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';


function Icon(props) {
  const { name, size, color } = props;

  return <AwesomeIcon name={name} size={size} color={color} />;
}

export default Icon;
