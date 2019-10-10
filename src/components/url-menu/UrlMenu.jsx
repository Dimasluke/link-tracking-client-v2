/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { handleDisplay } from '../../redux/reducers/url-create-reducer';

function UrlMenu(props) {
  const { tags, handleDisplay } = props;

  const mappedTags = tags
    ? tags.map(tag => {
        return tag.title;
      })
    : null;

  return (
    <Col>
      <Row>
        <Button onClick={() => handleDisplay(true)}>Create</Button>
      </Row>
      <Row>
        <Typeahead
          id="input-tags-filter"
          className="input-typeahead"
          placeholder="Filter by alias, destination, or tag..."
          options={mappedTags || []}
          labelKey="name"
          multiple
          clearButton
          onChange={e => console.log(e)}
        />
      </Row>
    </Col>
  );
}

const mapStateToProps = state => {
  return {
    tags: state.getTags.tags
  };
};

export default connect(
  mapStateToProps,
  { handleDisplay }
)(UrlMenu);
