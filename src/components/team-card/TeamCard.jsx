import React from 'react';
import { ListGroupItem, Row, Col } from 'reactstrap';

function TeamCard(props) {
  const { title } = props;

  return (
    <ListGroupItem action>
      <Row>
        <Col>{title}</Col>
      </Row>
    </ListGroupItem>
  );
}

export default TeamCard;
