import React from 'react';
import { connect } from 'react-redux';
import { handleCustom } from '../redux/login-reducer';

function Header(props) {
  const { header, style, custom } = props;

  if (custom) {
    props.handleCustom({ custom });
  }

  return <h1 style={style}>{header}</h1>;
}

const mapStateToProps = state => {
  return {
    header: state.login.custom.header,
    style: state.login.custom.styles.header
  };
};

export default connect(
  mapStateToProps,
  { handleCustom }
)(Header);
