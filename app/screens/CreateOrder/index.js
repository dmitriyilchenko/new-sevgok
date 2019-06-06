import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, KeyboardAvoidingView, SafeAreaView } from 'react-native';

import styles from './styles';
import i18n from '../../i18n';
import Button from '../../components/Button';
import OrderInput from '../../components/OrderInput';
import WarehouseInput from '../../components/WarehouseInput';
import Warehouse from '../../firebase/Warehouse';
import { getWarehouseName } from '../../utils/string';


class CreateOrder extends Component {

  state = {
    order: null,
    senderWarehouse: null,
    recipientWarehouse: null
  };

  async componentDidMount() {
    const { user } = this.props;
    const senderWarehouse = await Warehouse.getWarehouse(user.warehouse_id, user.city_code);

    this.setState({ senderWarehouse });
  }

  onWarehouseChange() {

  }

  render() {
    const { user } = this.props;
    const { senderWarehouse } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.senderInfoContainer}>
            <Text style={styles.senderInfoTitle}>{i18n.t('create_order.sender_info.title')}</Text>
            <Text style={styles.senderInfoLabel}>
              {i18n.t('create_order.sender_info.fullname')}
              <Text style={styles.senderInfoValue}>{user.fullname}</Text>
            </Text>
            <Text style={styles.senderInfoLabel}>
              {i18n.t('create_order.sender_info.warehouse')}
              <Text style={styles.senderInfoValue}>{getWarehouseName(senderWarehouse, user.city_code)}</Text>
            </Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.recipientInfoContainer}>
            <Text style={styles.senderInfoTitle}>{i18n.t('create_order.recipient_info.title')}</Text>
            <WarehouseInput
              width={200}
              placeholder={i18n.t('sign_up.warehouse_id')}
              onValueChange={(recipientWarehouse) => this.setState({ recipientWarehouse })}
            />
          </View>
          <View style={styles.separator} />
          <View style={styles.orderInfoContainer}>
            <Text style={styles.senderInfoTitle}>{i18n.t('create_order.order_info.title')}</Text>
            <OrderInput
              width={200}
            />
            <Text style={styles.senderInfoLabel}>{i18n.t('create_order.order_info.description')}</Text>
            <TextInput
              multiline={true}
              style={styles.orderInfoDescription}
            />
          </View>
          <Button label={i18n.t('create_order.send')} />
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
