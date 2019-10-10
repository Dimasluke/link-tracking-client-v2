import React from 'react';
import { connect } from 'react-redux';
import { handleCustom } from '../redux/password-reset-confirm';

function Header(props) {
  const { style, header, custom, expired } = props;

  if (custom) {
    props.handleCustom({ custom });
  }

  return (
    <div style={expired ? { display: 'none' } : null}>
      <div>
        <h1 style={style}>{header}</h1>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    header: state.reset.custom.header,
    style: state.reset.custom.styles.header,
    expired: state.reset.expired
  };
};

export default connect(
  mapStateToProps,
  { handleCustom }
)(Header);
