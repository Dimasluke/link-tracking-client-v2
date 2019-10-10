import React from 'react';
import { connect } from 'react-redux';
import { handleCustom } from '../redux/reset-reducer';

function Header(props) {
  const { style, header, custom } = props;
  console.log(header);
  // eslint-disable-next-line react/destructuring-assignment
  props.handleCustom({ custom });

  return (
    <div>
      <h1 style={style}>{header}</h1>
    </div>
  );
}

const mapStateToProps = state => {
  console.log('password reset state', state);
  return {
    header: state.reset.custom.header,
    style: state.reset.custom.styles.header
  };
};

export default connect(
  mapStateToProps,
  { handleCustom }
)(Header);
