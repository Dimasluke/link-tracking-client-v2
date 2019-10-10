/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { ListGroupItem, Row, Col, Badge } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { handleUrlSelect } from '../../redux/reducers/url-list-reducer';

function UrlCard(props) {
  const { alias, destination, tags, handleUrlSelect } = props;

  const mappedTags = tags.map(tag => {
    return (
      <Badge key={tag.id} color="info">
        {tag.title}
      </Badge>
    );
  });

  return (
    <ListGroupItem onClick={() => handleUrlSelect(alias)} action>
      <Row>
        <Col xs="10">
          <Row>{alias}</Row>
          <Row>{destination}</Row>
          <Row>{mappedTags}</Row>
        </Col>
        <Col xs="2">
          <Row style={{ justifyContent: 'flex-end', marginRight: '20px' }}>
            <FontAwesome name="link" />
          </Row>
        </Col>
      </Row>
    </ListGroupItem>
  );
}

const mapStateToProps = state => {
  return {
    selectedUrl: state.getUrls.selectedUrl
  };
};

export default connect(
  mapStateToProps,
  { handleUrlSelect }
)(UrlCard);
