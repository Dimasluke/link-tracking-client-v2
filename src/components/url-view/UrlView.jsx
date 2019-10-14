/* eslint-disable no-shadow */
import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner
} from 'reactstrap';
import { connect } from 'react-redux';
import {
  handleUrls,
  handleResetUrl
} from '../../redux/reducers/url-list-reducer';
import { handleTagsList } from '../../redux/reducers/tags-list-reducer';
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
import deleteUrl from '../../lib/urls-delete';
import getUrls from '../../lib/urls-get';
import getTags from '../../lib/tags-get';

class UrlView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  async handleDelete() {
    this.setState({ loading: true });
    const {
      user,
      selectedTeam,
      selectedUrl,
      handleUrls,
      handleTagsList,
      handleResetUrl
    } = this.props;

    await deleteUrl(selectedUrl.alias);
    handleUrls(
      await getUrls(selectedTeam.id ? selectedTeam.title : user.user.username)
    );
    handleTagsList(
      await getTags(selectedTeam.id ? selectedTeam.title : user.user.username)
    );

    handleResetUrl();
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
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
    } = this.props;

    const handleFilter = async function() {
      handleVisits(await filterVisits(selectedUrl.id, start, end));
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
            <Button
              size="sm"
              style={{ marginLeft: '15px', width: '80px' }}
              color="danger"
              onClick={() => this.handleDelete()}
            >
              {loading ? <Spinner size="sm" /> : 'Delete'}
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
}

const mapStateToProps = state => {
  return {
    selectedUrl: state.getUrls.selectedUrl,
    selectedTeam: state.getTeams.selectedTeam,
    visits: state.visits.visits,
    start: state.visits.start,
    end: state.visits.end,
    user: state.user.user
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
    handleDisplay,
    handleUrls,
    handleTagsList,
    handleResetUrl
  }
)(UrlView);
