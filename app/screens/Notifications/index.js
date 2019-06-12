import _ from 'lodash';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  RefreshControl
} from 'react-native';

import styles from './styles';
import { notificationsTypes } from './constants';
import Order from '../../firebase/Order';
import Type from '../../components/Notifications/Type';
import Item from '../../components/Notifications/Item';


class Notifications extends Component {

  state = {
    selectedTypes: ['arrived'],
    notifications: {},
    loading: false
  };

  componentDidMount() {
    this.fetchSelectedTypes()
  }

  isSelectedType(type) {
    return !!~this.state.selectedTypes.indexOf(type);
  }

  async fetchNotifications(type) {
    const { warehouseId } = this.props;
    const methodName = Order.methodsByType[type] || Order.methodsByType.default;
    const orders = await Order[methodName](warehouseId);

    return { [type]: orders };
  }

  async fetchSelectedTypes() {
    this.setState({ loading: true });
    const { selectedTypes } = this.state;
    const promises = selectedTypes.map(type => this.fetchNotifications(type));
    const notifications = await Promise.all(promises);

    let flatten = {};
    _.map(notifications, obj => flatten = { ...flatten, ...obj });

    this.setState({ loading: false, notifications: flatten });
  }

  getNotifications() {
    const list = [];

    _.mapValues(this.state.notifications, (notifications, key) => _.map(notifications, (notification) => list.push({ ...notification, type: key })));

    return _.uniqBy(list, 'id')
  }

  async onToggleType(item) {
    const { selectedTypes, notifications } = this.state;
    const wasSelected = this.isSelectedType(item.value);

    this.setState({
      loading: true,
      selectedTypes: wasSelected ? selectedTypes.filter(value => value !== item.value) : [...selectedTypes, item.value]
    });

    if (wasSelected) {
      this.setState({ loading: false, notifications: { ...notifications, [item.value]: [] } });
      return;
    }

    const newNotifications = await this.fetchNotifications(item.value);

    this.setState({ loading: false, notifications: { ...notifications, ...newNotifications } });
  }

  renderType = ({ item }) => {
    return <Type onPress={() => this.onToggleType(item)} disabled={!this.isSelectedType(item.value)} label={item.value} />;
  }

  renderNotification({ item }) {

    return <Item {...item} language={this.props.language} />
  }

  render() {
    const notifications = this.getNotifications();

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.typesContainer}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.value}
            data={notificationsTypes}
            renderItem={this.renderType}
            extraData={[this.state.selectedTypes, this.props.language]}
          />
        </View>
        <View style={styles.separator} />
        <FlatList
          data={notifications}
          style={styles.notificationsList}
          keyExtractor={item => item.id}
          renderItem={(item) => this.renderNotification(item)}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          extraData={this.props.language}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={() => this.fetchSelectedTypes()}
            />
          }
        />
      </SafeAreaView>
    );
  }
}

function mapStateToProps({ auth, translations }) {
  return {
    warehouseId: auth.user.warehouse_id,
    language: translations.language
  }
}
export default connect(mapStateToProps, {})(Notifications);
