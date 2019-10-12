/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'reactstrap';
import { handleDisplay } from '../../redux/reducers/team-create-reducer';

function TeamMenu(props) {
  const { handleDisplay } = props;

  return (
    <Col style={{ marginTop: '20px' }}>
      <Row>
        <Button onClick={() => handleDisplay(true)} color="primary">
          Create
        </Button>
      </Row>
    </Col>
  );
}

export default connect(
  null,
  { handleDisplay }
)(TeamMenu);
