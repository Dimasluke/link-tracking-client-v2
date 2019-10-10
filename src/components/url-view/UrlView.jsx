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

function UrlView(props) {
  const {
    selectedUrl,
    visits,
    start,
    end,
    handleVisits,
    handleStart,
    handleEnd
  } = props;
  console.log(selectedUrl);
  console.log(visits);
  return (
    <Container style={!selectedUrl.id ? { display: 'none' } : null}>
      <Col>
        <Row>
          <h1>{selectedUrl.alias}</h1>
        </Row>
        <Row>
          <p>{selectedUrl.destination}</p>
        </Row>
        <Row>
          <Button size="sm">Edit</Button>
          <Button size="sm" style={{ marginLeft: '15px' }}>
            Delete
          </Button>
        </Row>
        <Row>
          <strong>Total clicks:</strong>
          <p style={{ marginLeft: '10px' }}>{visits.total}</p>
        </Row>
        <Row>
          <strong>Total unique clicks:</strong>
          <p style={{ marginLeft: '10px' }}>{visits.unique}</p>
        </Row>
        <Form>
          <Row>
            <Col>
              <FormGroup>
                <Label>Start</Label>
                <Input
                  type="date"
                  value={start}
                  onChange={e => handleStart(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>End</Label>
                <Input
                  type="date"
                  value={end}
                  onChange={e => handleEnd(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Button>Filter</Button>
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
  { handleStart, handleEnd, handleVisits }
)(UrlView);
