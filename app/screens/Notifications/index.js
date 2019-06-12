import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  RefreshControl
} from 'react-native';

import styles from './styles';
import { notificationsTypes } from './constants';
import i18n from '../../i18n';
import Button from '../../components/Button';
import Type from '../../components/Notifications/Type';
import Item from '../../components/Notifications/Item';


const mockedSoonItems = [
  { id: 0, title: 'Order #43', description: 'will be delivered in 2 hours' },
  { id: 1, title: 'Order #10', description: 'will be delivered in 5 and a half hours' },
  { id: 2, title: 'Order #5', description: 'will be delivered in 9 hours' },
  { id: 3, title: 'Order #23', description: 'will be delivered in 3 hours' },
];
class Notifications extends Component {

  state = {
    selectedType: 'soon'
  };

  onRefresh() {

  }

  renderType = ({ item }) => {
    const { selectedType } = this.state;
    const onPress = () => this.setState({ selectedType: item.value });

    return <Type onPress={onPress} disabled={item.value !== selectedType} label={item.value} />;
  }

  renderNotification({ item }) {

    return <Item {...item} />
  }

  render() {

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.typesContainer}>
          <FlatList
            horizontal={true}
            data={notificationsTypes}
            renderItem={this.renderType}
            extraData={this.state.selectedType}
          />
        </View>
        <View style={styles.separator} />
        <FlatList
          data={mockedSoonItems}
          style={styles.notificationsList}
          renderItem={(item) => this.renderNotification(item)}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefresh()}
            />
          }
        />
      </SafeAreaView>
    );
  }
}

export default Notifications;
