import moment from 'moment';
import { connect } from 'react-redux';
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
    receiveLoading: false
  }

  async onReceive() {
    this.setState({ receiveLoading: true });

    const res = await Order.updateOrder(this.state.orderId, { status: 'received' });

    this.setState({ receiveLoading: false });
    this.onSearch();
  }

  async onSearch() {
    if (!this.state.orderId) {
      this.setState({ foundOrder: null, senderInfo: null, recipientInfo: null });
      return;
    };

    this.setState({ loading: true });
    const foundOrder = await Order.getOrder(this.state.orderId);

    if (!foundOrder) {
      this.setState({ loading: false, foundOrder: null, senderInfo: null, recipientInfo: null });
      return;
    }

    const { sender, destination } = foundOrder;
    const senderWarehouse = await Warehouse.getWarehouse(sender.id, sender.city_code);
    const recipientWarehouse = await Warehouse.getWarehouse(destination.id, destination.city_code);

    const senderInfo = { ...sender, ...senderWarehouse };
    const recipientInfo = { ...destination, ...recipientWarehouse };


    this.setState({ foundOrder, senderInfo, recipientInfo, loading: false });
  }

  renderResult() {
    const { foundOrder, senderInfo, recipientInfo } = this.state;
    const sentDate = moment(foundOrder.sent_at).format('MMM Do YYYY, H:mm');
    const deliveryDate = moment(foundOrder.arrive_at).format('MMM Do YYYY, H:mm');

    return (
      <>
        <Text style={styles.orderName}>{getOrderName(foundOrder ?.id)}</Text>
        {
          !!foundOrder.description &&
          <ScrollView style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>{foundOrder.description}</Text>
          </ScrollView>
        }
        <View style={styles.routeContainer}>
          <Text style={styles.routeLabel}>{getWarehouseName(senderInfo, senderInfo.city_code)}</Text>
          <Icon style={styles.routeIcon} name='long-arrow-right' />
          <Text style={styles.routeLabel}>{getWarehouseName(recipientInfo, recipientInfo.city_code)}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>
            {i18n.t('find_order.status')}
            <Text style={styles.detailValue}> {i18n.t(`find_order.${foundOrder.status}`)}</Text>
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
    const { user } = this.props;
    const { loading, foundOrder, recipientInfo, receiveLoading } = this.state;
    const showReceive = foundOrder ?.status === 'sent' && user ?.warehouse_id === recipientInfo ?.id;


    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.searchContainer}>
          <OrderInput
            value={this.state.orderId}
            onCode={({ orderId }) => { this.setState({ orderId }, () => this.onSearch()) }}
            onValueChange={(orderId) => this.setState({ orderId })}
            style={{ flex: 1, marginRight: 10, maxWidth: 10000 }}
          />
          <TouchableOpacity onPress={() => this.onSearch()}>
            <Icon name='search' size={30} color='#616161' />
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        <ScrollView contentContainerStyle={styles.resultContainer}>
          <ActivityIndicator animating={loading} color='black' />
          {foundOrder && this.renderResult()}
        </ScrollView>
        {
          showReceive &&
          <View style={{ alignSelf: 'stretch' }}>
            <Button
              style={styles.receive}
              loading={receiveLoading}
              onPress={() => this.onReceive()}
              label={i18n.t('find_order.receive')}
            />
          </View>
        }
      </SafeAreaView>
    );
  }
}

function mapStateToProps({ auth, translations }) {
  return {
    user: auth.user,
    language: translations.language
  }
}

export default connect(mapStateToProps, {})(FindOrder);
