import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';


class Item extends Component {

  render() {
    const { title, description } = this.props;

    return (
      <TouchableOpacity style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </TouchableOpacity>
    );
  }
}

export default Item;

Item.defaultProps = {
  title: ''
};
