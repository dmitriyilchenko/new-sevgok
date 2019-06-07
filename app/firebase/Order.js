import firebase from 'firebase';


class Order {

  async getOrder(id) {
    const orderRef = firebase.database().ref(`Orders/${id}`);
    const snapshot = await orderRef.once('value');

    return snapshot.val();
  }

  async updateOrder() {

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
