import _ from 'lodash';
import firebase from 'firebase';

import axios from '../utils/axios';


class Warehouse {

  getInfo() {
    const lat = 50.4254395;
    const long = 30.5404806;
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`;
    const distanceUrl = 'http://router.project-osrm.org/table/v1/driving/50.42,30.54;48.07,33.511376'

    axios.get(url).then(res => console.log(res)).catch(err => console.log(err))
  }

  async createWarehouse(cityCode, data) {
    const warehousesRef = firebase.database().ref(`Warehouses/${cityCode}`);

    warehousesRef.push(data);

    return data;
  }

  async getCitiesCodes() {
    const warehousesRef = firebase.database().ref('Warehouses/');
    const snapshot = await warehousesRef.once('value');

    return _.keys(snapshot.val());
  }

  async getWarehouses(cityCode) {
    const warehousesRef = firebase.database().ref(`Warehouses/${cityCode}`);
    const snapshot = await warehousesRef.once('value');

    return snapshot.val();
  }
}

export default new Warehouse;
