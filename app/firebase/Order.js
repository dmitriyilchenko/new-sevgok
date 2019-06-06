import firebase from 'firebase';


class Order {

  constructor() {
    const config = {
      databaseURL: "https://new-sevgok.firebaseio.com",
      projectId: "new-sevgok",
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }

  async getOrder(id) {
    const orderRef = firebase.database().ref(`Orders/${id}`);
    const snapshot = await orderRef.once('value');

    return snapshot.val();
  }

  async updateOrder() {

  }

  async createOrder(data) {
    const ordersRef = firebase.database().ref('Orders/');
    const snapshot = await ordersRef.once('value');
    const newOrder = ordersRef.child(snapshot.numChildren());

    newOrder.set(data);

    return data;
  }
}

export default new Order;
