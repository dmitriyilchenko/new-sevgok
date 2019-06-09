import moment from 'moment';
import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import styles from './styles';
import i18n from '../../i18n';
import OrderInput from '../../components/OrderInput';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import Order from '../../firebase/Order';
import Warehouse from '../../firebase/Warehouse';
import { getWarehouseName, getOrderName } from '../../utils/string';


class FindOrder extends Component {

  state = {
    orderId: '',
    loading: false,
    foundOrder: null,
    senderInfo: null,
    recipientInfo: null,
    deliveryTime: null
  }

  async onSearch() {
    if (!this.state.orderId) return;

    this.setState({ loading: true });

    const foundOrder = await Order.getOrder(this.state.orderId);
    const { sender, destination } = foundOrder;

    const senderWarehouse = await Warehouse.getWarehouse(sender.id, sender.city_code);
    const recipientWarehouse = await Warehouse.getWarehouse(destination.id, destination.city_code);
    const deliveryTime = (await Warehouse.getDistance(senderWarehouse.locale, recipientWarehouse.locale)).durations[0][1] * 1000;

    const senderInfo = { ...sender, ...senderWarehouse };
    const recipientInfo = { ...destination, ...recipientWarehouse };


    this.setState({ foundOrder, senderInfo, recipientInfo, deliveryTime, loading: false });
  }

  renderResult() {
    const { foundOrder, senderInfo, recipientInfo, deliveryTime } = this.state;
    const sentDate = moment(foundOrder.sent_at).format('MMM Do YYYY, H:mm');
    const deliveryDate = moment(foundOrder.sent_at + deliveryTime).format('MMM Do YYYY, H:mm');

    return (
      <>
        <Text style={styles.orderName}>{getOrderName(foundOrder ?.id)}</Text>
        {
          !!foundOrder.description &&
          <ScrollView style={styles.descriptionContainer}>
            <Text>{foundOrder.description}</Text>
          </ScrollView>
        }
        <View style={styles.routeContainer}>
          <Text>{getWarehouseName(senderInfo, senderInfo.city_code)}</Text>
          <Icon style={styles.routeIcon} name='long-arrow-right' />
          <Text>{getWarehouseName(recipientInfo, recipientInfo.city_code)}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>
            {i18n.t('find_order.status')}
            <Text style={styles.detailValue}> {foundOrder.status}</Text>
          </Text>
          <Text style={styles.detailLabel}>
            {i18n.t('find_order.sent_at')}
            <Text style={styles.detailValue}> {sentDate}</Text>
          </Text>
          <Text style={styles.detailLabel}>
            {i18n.t('find_order.expected_delivery_time')}
            <Text style={styles.detailValue}> {deliveryDate}</Text>
          </Text>
        </View>
      </>
    );
  }

  render() {
    const { loading, foundOrder } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <OrderInput
            value={this.state.orderId}
            onValueChange={(orderId) => this.setState({ orderId })}
            style={{ flex: 1, marginRight: 10, maxWidth: 10000 }}
          />
          <TouchableOpacity onPress={() => this.onSearch()}>
            <Icon name='search' size={30} color='#616161' />
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        <View style={styles.resultContainer}>
          <ActivityIndicator animating={loading} color='black' />
          {foundOrder && this.renderResult()}
        </View>
        {
          true &&
          <View>
            <Button label='receive' />
          </View>
        }
      </SafeAreaView>
    );
  }
}

export default FindOrder;
