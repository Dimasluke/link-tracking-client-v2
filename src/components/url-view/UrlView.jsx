/* eslint-disable no-shadow */
import React from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import { connect } from 'react-redux';
import {
  handleVisits,
  handleStart,
  handleEnd
} from '../../redux/reducers/visit-filter-reducer';
import {
  handleUpdatedAlias,
  handleUpdatedDestination,
  handleUpdatedTags,
  handleDisplay
} from '../../redux/reducers/url-update-reducer';
import filterVisits from '../../lib/visits-filter';

function UrlView(props) {
  const {
    selectedUrl,
    visits,
    start,
    end,
    handleVisits,
    handleStart,
    handleEnd,
    handleUpdatedAlias,
    handleUpdatedDestination,
    handleUpdatedTags,
    handleDisplay
  } = props;

  const handleFilter = async function() {
    console.log(selectedUrl.id, start, end);
    // handleVisits(await filterVisits(selectedUrl.id, start, end));
  };

  return (
    <Container
      style={!selectedUrl.id ? { display: 'none' } : { marginTop: '20px' }}
    >
      <Col>
        <Row>
          <h1>{selectedUrl.alias}</h1>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <small>{selectedUrl.destination}</small>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <Button
            size="sm"
            color="primary"
            onClick={() => {
              handleUpdatedAlias(selectedUrl.alias);
              handleUpdatedDestination(selectedUrl.destination);
              handleUpdatedTags(selectedUrl.tags);
              handleDisplay(true);
            }}
          >
            Edit
          </Button>
          <Button size="sm" style={{ marginLeft: '15px' }} color="danger">
            Delete
          </Button>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <strong>Total clicks:</strong>
          <p style={{ marginLeft: '10px' }}>{visits.total}</p>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <strong>Total unique clicks:</strong>
          <p style={{ marginLeft: '10px' }}>{visits.unique}</p>
        </Row>
        <Form>
          <Row>
            <Col>
              <FormGroup>
                <Label>
                  <strong>Start</strong>
                </Label>
                <Input
                  type="date"
                  value={start}
                  onChange={e => handleStart(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>
                  <strong>End</strong>
                </Label>
                <Input
                  type="date"
                  value={end}
                  onChange={e => handleEnd(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Button size="sm" onClick={() => handleFilter()}>
            Filter
          </Button>
        </Form>
      </Col>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    selectedUrl: state.getUrls.selectedUrl,
    visits: state.visits.visits,
    start: state.visits.start,
    end: state.visits.end
  };
};

export default connect(
  mapStateToProps,
  {
    handleStart,
    handleEnd,
    handleVisits,
    handleUpdatedAlias,
    handleUpdatedDestination,
    handleUpdatedTags,
    handleDisplay
  }
)(UrlView);
