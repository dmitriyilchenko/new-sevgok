import { connect } from 'react-redux';
import React, { Component } from 'react';


function withTranslations(WrappedComponent) {

  class Enhanced extends Component {
    render() {
      const { forwardedRef } = this.props;

      return <WrappedComponent ref={forwardedRef} {...this.props} />;
    }
  };

  function forwardRef(props, ref) {
    return <Enhanced {...props} forwardedRef={ref} />;
  }

  function mapStateToProps({ translations }) {
    return { language: translations.language }
  }

  return connect(mapStateToProps, {})(React.forwardRef(forwardRef));
}

export default withTranslations
