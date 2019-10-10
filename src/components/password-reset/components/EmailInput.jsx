import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, Input } from 'reactstrap';
import { handleEmail } from '../redux/reset-reducer';

function EmailInput(props) {
  const { email, style, submitted } = props;

  return (
    <div style={submitted ? { display: 'none' } : { width: '100%' }}>
      <FormGroup>
        <Input
          style={style}
          type="text"
          placeholder="Email"
          onChange={e => props.handleEmail({ email: e.target.value })}
          value={email}
        />
      </FormGroup>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    email: state.reset.email,
    submitted: state.reset.submitted,
    style: state.reset.custom.styles.input
  };
};

export default connect(
  mapStateToProps,
  { handleEmail }
)(EmailInput);
