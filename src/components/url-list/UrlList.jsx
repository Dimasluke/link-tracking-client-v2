import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, Row, Col } from 'reactstrap';
import UrlCard from '../url-card/UrlCard';

function UrlList(props) {
  const { urls } = props;

  const mappedUrls = urls.map(url => {
    return (
      <UrlCard
        key={url.id}
        alias={url.alias}
        tags={url.tags}
        destination={url.destination}
      />
    );
  });
  return (
    <ListGroup style={{ maxHeight: '75vh', overflowY: 'auto' }}>
      {mappedUrls}
    </ListGroup>
  );
}

const mapStateToProps = state => {
  return {
    urls: state.getUrls.urls
  };
};

export default connect(
  mapStateToProps,
  null
)(UrlList);
