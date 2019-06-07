import _ from 'lodash';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';

import styles from './styles';
import i18n from '../../i18n';
import Navigator from '../../utils/Navigator';
import Icon from '../../components/Icon';
import Button from '../../components/Button';
import LanguageModal from '../../components/LanguageModal';
import WarehouseInput from '../../components/WarehouseInput';
import { update, signOut } from '../../actions/auth';
import User from '../../firebase/User';
import Warehouse from '../../firebase/Warehouse';
import { getWarehouseName } from '../../utils/string';


class Profile extends Component {

  state = {
    warehouse: null,
    newFullname: '',
    newWarehouse: null,
    updateDisabled: true,
    updateLoading: false,
    languageModalVisible: false,
  };

  componentDidMount() {
    this.getWarehouse();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user ?.warehouse_id !== this.props.user ?.warehouse_id) this.getWarehouse();
  }

  async getWarehouse() {
    const { user } = this.props;
    const warehouse = await Warehouse.getWarehouse(user.warehouse_id, user.city_code);

    this.setState({ warehouse });
  }

  onChangeField(field, value) {
    const fullnameValid = field === 'newFullname' && value.length > 4;
    const warehouseIdValid = field === 'newWarehouse' && !_.isNil(value);
    const updateDisabled = !fullnameValid && !warehouseIdValid;

    this.setState({ [field]: value, updateDisabled });
  }

  clear() {
    this.warehouseInput.clear();
    this.setState({ newFullname: '', newWarehouse: null, updateDisabled: true });
  }

  logout() {
    const cb = () => setTimeout(() => this.props.signOut());
    Navigator.setRoot('SignIn', null, {}, cb);
  }

  async update() {
    this.setState({ updateLoading: true });
    const { user } = this.props;
    const { newFullname, newWarehouse } = this.state;

    const data = {
      email: user.email,
      fullname: newFullname.length > 4 ? newFullname : user.fullname,
      warehouse_id: !_.isNil(newWarehouse) ? newWarehouse.id : user.warehouse_id,
      city_code: !_.isNil(newWarehouse) ? newWarehouse.city_code : user.city_code,
    };

    const newUser = await User.updateUser(data);
    this.props.update(newUser);
    this.clear();
    this.setState({ updateLoading: false });
  }

  render() {
    const { user } = this.props;
    const { warehouse, updateDisabled, updateLoading, languageModalVisible } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.fullname}>{user ?.fullname}</Text>
          <Text style={styles.warehouse}>{getWarehouseName(warehouse, user ?.city_code)}</Text>
          <TouchableOpacity
            onPress={() => this.setState({ languageModalVisible: true })}
            style={{ position: 'absolute', right: 20, top: 15 }}
          >
            <Icon style={{ fontSize: 25, color: '#448AFF' }} name='globe' />
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        <ScrollView style={styles.updateInfoContainer}>
          <View style={styles.updateInfoItem}>
            <Text style={styles.updateItemLabel}>{i18n.t('profile.new_warehouse')}</Text>
            <View style={{ height: 50 }}>
              <WarehouseInput
                width={200}
                ref={(ref) => this.warehouseInput = ref}
                placeholder={i18n.t('sign_up.warehouse_id')}
                onValueChange={(val) => this.onChangeField('newWarehouse', val)}
              />
            </View>
          </View>
          <View style={styles.updateInfoItem}>
            <Text style={styles.updateItemLabel}>{i18n.t('profile.new_fullname')}</Text>
            <View style={{ height: 50 }}>
              <TextInput
                value={this.state.newFullname}
                style={styles.input}
                placeholder={i18n.t('sign_up.fullname')}
                onChangeText={(val) => this.onChangeField('newFullname', val)}
              />
            </View>
          </View>
          <Button
            loading={updateLoading}
            disabled={updateDisabled}
            onPress={() => this.update()}
            label={i18n.t('profile.update')}
            style={{ marginTop: 20, alignSelf: 'flex-end' }}
          />
        </ScrollView>
        <View style={styles.separator} />
        <View style={{ alignSelf: 'stretch' }}>
          <Button
            style={styles.signOut}
            label={i18n.t('profile.sign_out')}
            onPress={() => this.logout()}
          />
        </View>
        <LanguageModal
          visible={languageModalVisible}
          onModalToggle={languageModalVisible => this.setState({ languageModalVisible })}
        />
      </SafeAreaView>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user
  };
}

export default connect(mapStateToProps, { update, signOut })(Profile);
