import _ from 'lodash';
import firebase from 'firebase';


class Order {

  methodsByType = {
    'soon': 'getSoonOrders',
    'arrived': 'getArrivedOrders',
    'sent': 'getSentOrders',
  }

  async getSoonOrders(warehouse_id = null) {
    const currentDay = Date.now() + 24 * 60 * 60 * 1000;
    const ordersRef = firebase.database().ref('Orders');
    const ordersSnapshot = await ordersRef.orderByChild('destination/id').equalTo(warehouse_id).limitToFirst(100).once('value');
    const orders = _.values(ordersSnapshot.val());
    const filtred = _.filter(orders, ({ arrive_at, status }) => status === 'sent' && arrive_at > Date.now() && arrive_at < currentDay);

    return filtred;
  }

  async getArrivedOrders(warehouse_id = null) {
    const ordersRef = firebase.database().ref('Orders');
    const ordersSnapshot = await ordersRef.orderByChild('destination/id').equalTo(warehouse_id).limitToFirst(100).once('value');
    const orders = _.values(ordersSnapshot.val());
    const filtred = _.filter(orders, ({ arrive_at, status }) => status === 'sent' && arrive_at < Date.now());

    return filtred;
  }

  async getSentOrders(warehouse_id = null) {
    const ordersRef = firebase.database().ref('Orders');
    const ordersSnapshot = await ordersRef.orderByChild('sender/id').equalTo(warehouse_id).once('value');

    return _.values(ordersSnapshot.val()) || [];
  }

  async getOrder(id) {
    const orderRef = firebase.database().ref(`Orders/${id}`);
    const snapshot = await orderRef.once('value');

    return snapshot.val();
  }

  async updateOrder(id, data) {

    const orderRef = firebase.database().ref(`Orders/${id}`);
    const snapshot = await orderRef.once('value');
    const order = snapshot.val();

    if (!order) return false;

    orderRef.update(data);

    return data;
  }

  async createOrder(data) {
    const isExist = !!(await this.getOrder(data.id));

    if (isExist) return false;

    const ordersRef = firebase.database().ref('Orders/');
    const newOrder = ordersRef.child(data.id);

    newOrder.set(data);

    return data;
  }
}

export default new Order;
