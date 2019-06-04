import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import Popup from '../Popup';
import i18n from '../../i18n';
import Warehouse from '../../firebase/Warehouse';


class WarehouseInput extends Component {

  state = {
    step: 'warehouse',
    modalVisible: false,
    selectedCity: 'ua_kyiv',
    warehouses: [],
    cities: [],
    warehouseLoading: false,
    citiesLoading: false,
    warehouseFilter: '',
    cityFilter: ''
  }

  componentDidMount() {
    this.getWarehouses();
    this.getCities();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedCity !== this.state.selectedCity) this.getWarehouses();
  }

  async getCities() {
    console.log('getCities')
    this.setState({ citiesLoading: true });
    const citiesCodes = await Warehouse.getCitiesCodes() || [];
    const cities = citiesCodes.map(code => ({ code, name: i18n.t(`cities.${code}`) }));
    console.log('getCities finished')

    this.setState({ cities, citiesLoading: false });
  }

  async getWarehouses() {
    this.setState({ warehouseLoading: true });

    const warehousesObj = await Warehouse.getWarehouses(this.state.selectedCity) || [];
    const warehouses = [];

    for (let id in warehousesObj) {
      warehouses.push({ id, name: `warehouse #${warehousesObj[id].number}` })
    }

    this.setState({ warehouses, warehouseLoading: false });
  }

  filterList = (data, filter) => data.filter(({ name }) => ~name.toLowerCase().indexOf(filter.toLowerCase()))

  onChangeField(field, value) {
    this.setState({ [field]: value });
  }

  renderSeparator() {
    return <View style={styles.separator} />
  }

  renderCityItem(item) {
    const { code, name } = item;

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => this.setState({ step: 'warehouse', selectedCity: code })}
      >
        <Text>{name}</Text>
      </TouchableOpacity>
    );
  }

  renderWarehouseItem(item) {
    const { name } = item;

    return (
      <TouchableOpacity
        onPress={() => null}
        style={styles.itemContainer}
      >
        <Text>{name}</Text>
      </TouchableOpacity>
    );
  }

  renderCityPicker() {
    const { cities, cityFilter, citiesLoading } = this.state;
    const data = this.filterList(cities, cityFilter);

    return (
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.modalIcon} onPress={() => this.setState({ step: 'warehouse' })}>
          <Icon name={'arrow-left'} color='black' size={30} />
        </TouchableOpacity>
        <TextInput
          value={cityFilter}
          autoCorrect={false}
          style={styles.input}
          placeholder={i18n.t('sign_up.fullname')}
          onChangeText={(val) => this.onChangeField('cityFilter', val)}
        />
        <ActivityIndicator animating={citiesLoading} color='black' />
        <FlatList
          data={data}
          style={styles.list}
          ItemSeparatorComponent={() => this.renderSeparator()}
          renderItem={({ item }) => this.renderCityItem(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }

  renderWarehousePicker() {
    const { warehouses, warehouseFilter, selectedCity, warehouseLoading } = this.state;
    const data = this.filterList(warehouses, warehouseFilter);

    return (
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.modalIcon} onPress={() => this.setState({ modalVisible: false })}>
          <Icon name={'close'} color='black' size={30} />
        </TouchableOpacity>
        <TextInput
          autoCorrect={false}
          style={styles.input}
          value={this.state.warehouseFilter}
          placeholder={i18n.t('sign_up.fullname')}
          onChangeText={(val) => this.onChangeField('warehouseFilter', val)}
        />
        <ActivityIndicator animating={warehouseLoading} color='black' />
        <FlatList
          data={data}
          style={styles.list}
          ItemSeparatorComponent={() => this.renderSeparator()}
          renderItem={({ item }) => this.renderWarehouseItem(item)}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity style={styles.pickCityButton} onPress={() => { this.getCities(); this.setState({ step: 'city' }) }}>
          <Text>{i18n.t(`cities.${selectedCity}`)}</Text>
          <Icon name={'arrow-right'} color='black' size={30} />
        </TouchableOpacity>
      </View>
    );
  }

  renderModalContent() {
    const { step, modalVisible } = this.state;

    if (!modalVisible) return null;

    if (step === 'warehouse') return this.renderWarehousePicker();
    if (step === 'city') return this.renderCityPicker();
  }

  render() {
    const {
      label,
      width,
      disabled,
      placeholder,
    } = this.props;
    const { step, modalVisible } = this.state;
    const customContainerStyles = { width };

    return (
      <View
        disabled={disabled}
        style={[styles.inputContainer, customContainerStyles]}
      >
        {label ? <Text style={styles.label}>{label}</Text> : <Text style={styles.placeholder}>{placeholder}</Text>}
        <TouchableOpacity
          style={styles.findIconContainer}
          onPress={() => this.setState({ modalVisible: true })}
        >
          <Text>+</Text>
        </TouchableOpacity>
        <Popup
          height={400}
          visible={modalVisible}
          step={step === 'city' ? 1 : 0}
          onModalToggle={modalVisible => this.setState({ modalVisible })}
        >
          {this.renderModalContent()}
        </Popup>
      </View>
    );
  }
}

export default WarehouseInput;

WarehouseInput.defaultProps = {
  label: '',
  width: 100,
  loading: false,
  placeholder: 'Start typing...',
  onChange: () => null
};
