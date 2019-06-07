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
import withTranslations from '../../hoc/withTranslations';
import { getWarehouseName, firstUpperCase } from '../../utils/string';


class WarehouseInput extends Component {

  state = {
    value: null,
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
    this.setState({ citiesLoading: true });
    const citiesCodes = await Warehouse.getCitiesCodes() || [];
    const cities = citiesCodes.map(code => ({ code, name: i18n.t(`cities.${code}`) }));

    this.setState({ cities, citiesLoading: false });
  }

  async getWarehouses() {
    this.setState({ warehouseLoading: true });

    const warehousesObj = await Warehouse.getWarehouses(this.state.selectedCity) || [];
    const warehouses = [];

    for (let id in warehousesObj) {
      warehouses.push({ id, name: `${firstUpperCase(i18n.t('warehouse'))} #${warehousesObj[id].number}` })
    }

    this.setState({ warehouses, warehouseLoading: false });
  }

  clear() {
    this.setState({ value: null });
  }

  filterList = (data, filter) => data.filter(({ name }) => ~name.toLowerCase().indexOf(filter.toLowerCase()))

  onValueChange(item) {
    this.props.onValueChange({ ...item, city_code: this.state.selectedCity });
    this.setState({ modalVisible: false, value: { ...item, city: this.state.selectedCity } });
  }

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
        onPress={() => this.onValueChange(item)}
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
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
          <TouchableOpacity style={styles.modalIcon} onPress={() => this.setState({ step: 'warehouse' })}>
            <Icon name={'chevron-left'} color='#FF1744' size={30} />
          </TouchableOpacity>
          <TextInput
            value={cityFilter}
            autoCorrect={false}
            style={styles.input}
            placeholder={i18n.t('sign_up.fullname')}
            onChangeText={(val) => this.onChangeField('cityFilter', val)}
          />
        </View>
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
          <Icon name={'close'} color='#FF1744' size={30} />
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
        <View style={styles.pickCityButton}>
          <Text style={{ fontSize: 15 }}>{firstUpperCase(i18n.t('city'))}</Text>
          <TouchableOpacity
            style={{ alignItems: 'center', flexDirection: 'row' }}
            onPress={() => { this.getCities(); this.setState({ step: 'city' }) }}
          >
            <Text style={styles.selectedCity}>{i18n.t(`cities.${selectedCity}`)}</Text>
            <Icon name={'chevron-right'} color='#FF1744' size={30} />
          </TouchableOpacity>
        </View>
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
    const { width, placeholder } = this.props;
    const { value, step, modalVisible } = this.state;
    const customContainerStyles = { width };
    const label = getWarehouseName(value);

    return (
      <TouchableOpacity
        onPress={() => this.setState({ modalVisible: true })}
        style={[styles.inputContainer, customContainerStyles]}
      >
        {label ? <Text style={styles.label}>{label}</Text> : <Text style={styles.placeholder}>{placeholder}</Text>}
        <Popup
          height={400}
          visible={modalVisible}
          step={step === 'city' ? 1 : 0}
          onModalToggle={modalVisible => this.setState({ modalVisible })}
        >
          {this.renderModalContent()}
        </Popup>
      </TouchableOpacity>
    );
  }
}

export default withTranslations(WarehouseInput);

WarehouseInput.defaultProps = {
  label: '',
  width: 100,
  placeholder: 'Start typing...',
  onValueChange: () => null
};
