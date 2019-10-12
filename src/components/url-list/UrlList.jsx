import React from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'reactstrap';
import _ from 'lodash';
import UrlCard from '../url-card/UrlCard';

function UrlList(props) {
  const { urls } = props;

  const mappedUrls = _.orderBy(urls, ['createdAt'], ['desc']).map(url => {
    return (
      <UrlCard
        key={url.id}
        id={url.id}
        alias={url.alias}
        tags={url.tags}
        destination={url.destination}
      />
    );
  });
  return (
    <ListGroup
      style={{ maxHeight: '73vh', overflowY: 'auto', marginTop: '20px' }}
    >
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
