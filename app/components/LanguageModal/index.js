import _ from 'lodash';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  View,
  Text,
  Keyboard,
  FlatList,
  TouchableOpacity
} from 'react-native';

import styles from './styles';
import i18n from '../../i18n';
import Navigator from '../../utils/Navigator';
import { changeLanguage } from '../../actions/translations';


class LanguageModal extends Component {

  componentDidMount() {
    Keyboard.dismiss();
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible && !prevProps.visible) Keyboard.dismiss();
  }

  onClose() {
    this.props.onModalToggle(false);
  }

  onChange(item) {
    this.props.changeLanguage(item);
    setTimeout(() => Navigator.updateTabsLabel());
  }

  renderItem(item) {

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => this.onChange(item)}>
          <Text>{i18n.t(item)}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { visible } = this.props;
    const languages = _.keys(i18n.translations);

    if (!visible) return null;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.touchableContainer}
          onPress={() => this.onClose()}
        />
        <View style={styles.modal}>
          <Text style={styles.title}>{i18n.t('language_modal.title')}</Text>
          <FlatList
            data={languages}
            style={{ marginBottom: 20 }}
            renderItem={({ item }) => this.renderItem(item)}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps({ translations }) {
  return {
    language: translations.language
  };
}

export default connect(mapStateToProps, { changeLanguage })(LanguageModal);


LanguageModal.defaultProps = {
  onModalToggle: () => null
};