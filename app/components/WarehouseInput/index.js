import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import Popup from '../Popup';
import i18n from '../../i18n';


const cities = [{ name: 'Kiev' }, { name: 'Krivoy Rog' }];
const warehouses = [{ name: '1' }, { name: '2' }];

class WarehouseInput extends Component {

  state = {
    step: 'warehouse',
    modalVisible: false,
    selectedCity: 'ua_kyiv',
    warehouses: [],
    cities: [],
    nameFilter: '',
    cityFilter: ''
  }

  filterList = (data, filter) => data.filter(({ name }) => ~name.toLowerCase().indexOf(filter.toLowerCase()))

  onChangeField(field, value) {
    this.setState({ [field]: value });
  }

  renderSeparator() {
    return <View style={styles.separator} />
  }

  renderCityItem(item) {
    const { name } = item;

    return (
      <View style={styles.itemContainer}>
        <Text>{name}</Text>
      </View>
    );
  }

  renderWarehouseItem(item) {
    const { name } = item;

    return (
      <View style={styles.itemContainer}>
        <Text>{name}</Text>
      </View>
    );
  }

  renderCityPicker() {
    const data = this.filterList(cities, this.state.cityFilter);

    return (
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.modalIcon} onPress={() => this.setState({ step: 'warehouse' })}>
          <Icon name={'arrow-left'} color='black' size={30} />
        </TouchableOpacity>
        <TextInput
          autoCorrect={false}
          style={styles.input}
          value={this.state.cityFilter}
          placeholder={i18n.t('sign_up.fullname')}
          onChangeText={(val) => this.onChangeField('cityFilter', val)}
        />
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
    const data = this.filterList(warehouses, this.state.nameFilter);

    return (
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.modalIcon} onPress={() => this.setState({ modalVisible: false })}>
          <Icon name={'close'} color='black' size={30} />
        </TouchableOpacity>
        <TextInput
          autoCorrect={false}
          style={styles.input}
          value={this.state.nameFilter}
          placeholder={i18n.t('sign_up.fullname')}
          onChangeText={(val) => this.onChangeField('nameFilter', val)}
        />
        <FlatList
          data={data}
          style={styles.list}
          ItemSeparatorComponent={() => this.renderSeparator()}
          renderItem={({ item }) => this.renderWarehouseItem(item)}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity style={styles.pickCityButton} onPress={() => this.setState({ step: 'city' })}>
          <Text>City</Text>
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
    const customContainerStyles = { width }

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
