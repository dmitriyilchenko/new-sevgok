import moment from 'moment';
import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';
import i18n from '../../../i18n';
import Navigator from '../../../utils/Navigator';
import { getOrderName } from '../../../utils/string';


class Item extends PureComponent {

  onItemPress() {
    Navigator.push(Navigator.activeComponentId, 'Order', { orderId: this.props.id })
  }

  renderTitle() {
    const { id, type } = this.props;

    if (~['soon', 'arrived', 'sent'].indexOf(type)) {
      return <Text style={styles.title}>{getOrderName(id)}</Text>
    }

    return null;
  }

  renderDescription() {
    const { type, arrive_at } = this.props;

    if (type === 'soon') {
      const date = new Date(new Date(arrive_at) - new Date());
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const t = i18n.t('notifications.soon_description');

      return <Text style={styles.description}>{`${t.start} ${hours ? hours + t.hours : ''} ${minutes > 10 ? t.and + minutes + t.minutes : (!hours ? t.at_any_moment : '')}`}</Text>
    }

    if (type === 'arrived') {
      const date = new Date(new Date() - new Date(arrive_at));
      const hours = date.getHours();
      const t = i18n.t('notifications.arrived_description');

      return <Text style={styles.description}>{hours > 2 ? (t.arrived + hours + t.hours) : t.just_arrived}</Text>
    }

    if (type === 'sent') {
      const { status } = this.props;
      const duration = moment.duration(new Date(arrive_at) - new Date()).humanize();

      if (status === 'received') {
        return <Text style={styles.description}>{i18n.t('notifications.received_description')}</Text>
      }

      if (status === 'sent' && arrive_at < Date.now()) {
        return <Text style={styles.description}>{i18n.t('notifications.not_arrived_description')}</Text>
      }
      return <Text style={styles.description}>{`${i18n.t('notifications.sent_description')} ${duration}`}</Text>
    }

    return null;
  }

  render() {

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.onItemPress()}
      >
        {this.renderTitle()}
        {this.renderDescription()}
      </TouchableOpacity>
    );
  }
}

export default Item;

Item.defaultProps = {
  title: ''
};
