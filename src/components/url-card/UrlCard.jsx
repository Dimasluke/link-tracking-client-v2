/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { ListGroupItem, Row, Col, Badge } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { handleUrlSelect } from '../../redux/reducers/url-list-reducer';

function UrlCard(props) {
  const { alias, destination, tags, handleUrlSelect, id, selectedUrl } = props;
  console.log(tags);
  const mappedTags = tags.map(tag => {
    return (
      <Badge
        key={tag.id}
        style={{ marginRight: '10px', backgroundColor: tag.tagColor }}
      >
        {tag.title}
      </Badge>
    );
  });

  return (
    <ListGroupItem
      onClick={() => handleUrlSelect(alias)}
      action
      style={
        selectedUrl.id === id
          ? { marginBottom: '15px', backgroundColor: '#f8f9fa' }
          : { marginBottom: '15px' }
      }
    >
      <Row>
        <Col xs="10">
          <Row style={{ marginBottom: '10px' }}>
            <a
              href={`https://rigszdctid.execute-api.us-east-1.amazonaws.com/dev/v1/urls/${alias}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              za.fan/{alias}
            </a>
          </Row>
          <Row style={{ marginBottom: '10px' }}>{destination}</Row>
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
