import { connect } from 'react-redux';
import React, { Component } from 'react';


function withTranslations(WrappedComponent) {

  class Enhanced extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  function mapStateToProps({ translations }) {
    return { language: translations.language }
  }

  return connect(mapStateToProps, {})(Enhanced);
}

export default withTranslations
