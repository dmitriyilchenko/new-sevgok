import React from 'react';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';


function Icon(props) {
  const { name, size, color, style } = props;

  return <AwesomeIcon style={style} name={name} size={size} color={color} />;
}

export default Icon;
