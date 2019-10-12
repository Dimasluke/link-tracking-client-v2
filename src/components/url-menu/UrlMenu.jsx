/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, Input } from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import _ from 'lodash';
import { handleDisplay } from '../../redux/reducers/url-create-reducer';
import {
  handleUrls,
  handleResetUrl
} from '../../redux/reducers/url-list-reducer';
import getUrls from '../../lib/urls-get';

class UrlMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterAliasOrDestinationInput: [],
      filterTagInput: []
    };
  }

  async componentDidUpdate(prevProps) {
    const { selectedTeam } = this.props;

    if (selectedTeam.id !== prevProps.selectedTeam.id) {
      this.resetInputs();
    }
  }

  async resetInputs() {
    this.setState({
      filterAliasOrDestinationInput: [],
      filterTagInput: []
    });
  }

  async handleFilterByAliasOrDestination(e) {
    const { user, selectedTeam, handleUrls, handleResetUrl } = this.props;
    this.setState({ filterAliasOrDestinationInput: e });

    const urls = selectedTeam.id
      ? await getUrls(selectedTeam.title)
      : await getUrls(user.user.username);

    if (!e.length) {
      handleUrls(urls);
      return;
    }

    const filteredUrls = await urls.filter(url => {
      return e.includes(url.alias) || e.includes(url.destination);
    });

    handleUrls(filteredUrls);
    handleResetUrl();
  }

  async handleFilterByTag(e) {
    const { user, selectedTeam, handleUrls, handleResetUrl } = this.props;
    this.setState({ filterTagInput: e });

    const urls = selectedTeam.id
      ? await getUrls(selectedTeam.title)
      : await getUrls(user.user.username);

    if (!e.length) {
      handleUrls(urls);
      return;
    }

    const filteredUrls = await urls.filter(url => {
      const tags = url.tags.map(tag => tag.title);
      return _.difference(e, tags).length === 0;
    });

    handleUrls(filteredUrls);
    handleResetUrl();
  }

  render() {
    const { tags, urls, handleDisplay } = this.props;
    const { filterAliasOrDestinationInput, filterTagInput } = this.state;

    const mappedTags = tags
      ? tags.map(tag => {
          return tag.title;
        })
      : [];

    const mappedAliases = urls
      ? urls.map(url => {
          return url.alias;
        })
      : [];

    const mappedDestination = urls
      ? urls.map(url => {
          return url.destination;
        })
      : [];

    const aliasAndDestinationOptions = [...mappedAliases, ...mappedDestination];
    const tagOptions = [...mappedTags];

    return (
      <Col style={{ marginTop: '20px' }}>
        <Row style={{ marginBottom: '10px' }}>
          <Button onClick={() => handleDisplay(true)} color="primary">
            Create
          </Button>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <Typeahead
            id="input-alias/destination-filter"
            className="input-typeahead"
            placeholder="Filter by alias or destination.."
            options={aliasAndDestinationOptions || []}
            labelKey="name"
            multiple
            clearButton
            selected={filterAliasOrDestinationInput}
            onChange={e => this.handleFilterByAliasOrDestination(e)}
          />
        </Row>
        <Row>
          <Typeahead
            id="input-tags-filter"
            className="input-typeahead"
            placeholder="Filter by tag"
            options={tagOptions || []}
            labelKey="tag"
            multiple
            clearButton
            selected={filterTagInput}
            onChange={e => this.handleFilterByTag(e)}
          />
        </Row>
      </Col>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    tags: state.getTags.tags,
    urls: state.getUrls.urls,
    selectedTeam: state.getTeams.selectedTeam
  };
};

export default connect(
  mapStateToProps,
  { handleDisplay, handleUrls, handleResetUrl }
)(UrlMenu);
