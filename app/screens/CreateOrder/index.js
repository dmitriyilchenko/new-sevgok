import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
  TextInput,
  ScrollView,
  SafeAreaView
} from 'react-native';

import styles from './styles';
import i18n from '../../i18n';
import Button from '../../components/Button';
import OrderInput from '../../components/OrderInput';
import WarehouseInput from '../../components/WarehouseInput';
import Warehouse from '../../firebase/Warehouse';
import Order from '../../firebase/Order';
import { getWarehouseName } from '../../utils/string';


class CreateOrder extends Component {

  state = {
    orderId: '',
    description: '',
    sendLoading: false,
    senderWarehouse: null,
    recipientWarehouse: null
  };

  async componentDidMount() {
    const { user } = this.props;
    const senderWarehouse = await Warehouse.getWarehouse(user.warehouse_id, user.city_code);

    this.setState({ senderWarehouse });
  }

  async onConfirm() {
    this.setState({ sendLoading: true });

    const { orderId, description, recipientWarehouse } = this.state;
    const { user } = this.props;
    const isValid = await this.validate();

    if (!isValid) {
      this.setState({ sendLoading: false });
      return;
    };

    const newOrder = await Order.createOrder({
      id: orderId,
      description,
      status: 'sent',
      sent_at: Date.now(),
      sender_id: user.warehouse_id,
      destination_id: recipientWarehouse.id
    });

    if (newOrder) {
      this.onClear();
      Alert.alert(i18n.t('create_order.success.title'), i18n.t('create_order.success.description'));
    }

    this.setState({ sendLoading: false });
  }

  onClear() {
    this.recipientInput.clear();
    this.setState({ orderId: '', recipientWarehouse: null });
  }

  async validate() {
    const { user } = this.props;
    const { recipientWarehouse, orderId } = this.state;
    const orderExist = await Order.getOrder(orderId);
    const isSameWarehouses = user.warehouse_id === recipientWarehouse ?.id;

    if (!recipientWarehouse) Alert.alert(i18n.t('create_order.empty_recipient.title'), i18n.t('create_order.empty_recipient.description'));
    if (orderExist) Alert.alert(i18n.t('create_order.order_exist.title'), i18n.t('create_order.order_exist.description'));
    if (isSameWarehouses) Alert.alert(i18n.t('create_order.same_warehouses.title'), i18n.t('create_order.same_warehouses.description'));

    return !orderExist && !isSameWarehouses && recipientWarehouse;
  }

  render() {
    const { user } = this.props;
    const { senderWarehouse, sendLoading } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.senderInfoContainer}>
            <Text style={styles.senderInfoTitle}>{i18n.t('create_order.sender_info.title')}</Text>
            <Text style={styles.senderInfoLabel}>
              {i18n.t('create_order.sender_info.fullname')}
              <Text style={styles.senderInfoValue}>{user ?.fullname}</Text>
            </Text>
            <Text style={styles.senderInfoLabel}>
              {i18n.t('create_order.sender_info.warehouse')}
              <Text style={styles.senderInfoValue}>{getWarehouseName(senderWarehouse, user ?.city_code)}</Text>
            </Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.recipientInfoContainer}>
            <Text style={styles.senderInfoTitle}>{i18n.t('create_order.recipient_info.title')}</Text>
            <WarehouseInput
              width={200}
              ref={(ref) => this.recipientInput = ref}
              placeholder={i18n.t('sign_up.warehouse_id')}
              onValueChange={(recipientWarehouse) => this.setState({ recipientWarehouse })}
            />
          </View>
          <View style={styles.separator} />
          <View style={styles.orderInfoContainer}>
            <Text style={styles.senderInfoTitle}>{i18n.t('create_order.order_info.title')}</Text>
            <OrderInput
              width={200}
              value={this.state.orderId}
              onValueChange={(orderId) => this.setState({ orderId })}
            />
            <Text style={styles.senderInfoLabel}>{i18n.t('create_order.order_info.description')}</Text>
            <TextInput
              multiline={true}
              value={this.state.description}
              onChangeText={description => this.setState({ description })}
              style={styles.orderInfoDescription}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Button style={styles.clear} label={i18n.t('create_order.clear')} onPress={() => this.onClear()} />
            <Button loading={sendLoading} style={styles.send} label={i18n.t('create_order.send')} onPress={() => this.onConfirm()} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user
  };
}

export default connect(mapStateToProps, {})(CreateOrder);
