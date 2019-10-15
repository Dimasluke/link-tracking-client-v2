/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Button,
  Badge,
  Spinner,
  FormFeedback
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import {
  handleAlias,
  handleDestination,
  handleTagInput,
  handleTags,
  handleMessage,
  handleLoading,
  handleDisplay
} from '../../redux/reducers/url-create-reducer';
import { handleUrls } from '../../redux/reducers/url-list-reducer';
import { handleTagsList } from '../../redux/reducers/tags-list-reducer';
import createUrl from '../../lib/urls-create';
import getUrls from '../../lib/urls-get';
import getTags from '../../lib/tags-get';

class UrlCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { tags: [], destinationError: false };
  }

  async componentDidUpdate(prevProps) {
    const { tags } = this.props;
    if (tags !== prevProps.tags) {
      this.render();
    }
  }

  async handleRemoveTag(e, tag) {
    e.preventDefault();

    const { tags, handleTags } = this.props;
    const indexOf = tags.findIndex(title => {
      return title === tag;
    });
    tags.splice(indexOf, 1);
    handleTags(tags);
    this.setState({ tags });
  }

  async handleSubmit() {
    const {
      alias,
      destination,
      user,
      selectedTeam,
      handleLoading,
      handleUrls,
      handleTagsList,
      handleMessage
    } = this.props;

    if (!destination) {
      this.setState({ destinationError: true });
      return;
    }

    handleLoading(true);
    let { tags } = this.props;

    const owner = selectedTeam.id
      ? { type: 'team', id: selectedTeam.title }
      : { type: 'user', id: user.user.username };

    tags = tags.map(tag => {
      return { title: tag, owner };
    });

    const response = await createUrl(alias, destination, tags, owner);

    if (response.error) {
      handleLoading(false);
      handleMessage(response.message);
      return;
    }

    handleUrls(await getUrls(owner.id));
    handleTagsList(await getTags(owner.id));
    handleLoading(false);
    this.toggle();
  }

  async toggle() {
    const {
      display,
      handleAlias,
      handleDestination,
      handleTagInput,
      handleTags,
      handleMessage,
      handleDisplay
    } = this.props;

    handleAlias('');
    handleDestination('');
    handleTagInput('');
    handleTags([]);
    handleMessage('');
    handleDisplay(!display);
  }

  render() {
    const { destinationError } = this.state;
    const {
      alias,
      destination,
      tagInput,
      tags,
      message,
      loading,
      display,
      handleAlias,
      handleDestination,
      handleTagInput,
      handleTags
    } = this.props;

    const handleAddTag = async function(e) {
      e.preventDefault();

      tags.push(tagInput);
      handleTags(tags);
      handleTagInput('');
    };

    const mappedTags = tags.map((tag, index) => {
      return (
        <Badge
          key={index}
          style={{ marginRight: '10px' }}
          onClick={e => this.handleRemoveTag(e, tag)}
        >
          {tag} <FontAwesome name="times" />
        </Badge>
      );
    });

    return (
      <Modal isOpen={display} toggle={() => this.toggle()}>
        <ModalHeader toggle={() => this.toggle()}>Create URL</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="url-create-alias">Alias (Optional)</Label>
              <Input
                type="text"
                name="alias"
                id="url-create-alias"
                bsSize="sm"
                value={alias}
                onChange={e => handleAlias(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="url-create-destination">Destination (Required)</Label>
              <Input
                type="text"
                name="destination"
                id="url-create-destination"
                bsSize="sm"
                value={destination}
                invalid={destinationError}
                onChange={e => {
                  this.setState({ destinationError: false });
                  handleDestination(e.target.value);
                }}
              />
              <FormFeedback>
                URL destination is required, Please try again.
              </FormFeedback>
            </FormGroup>
          </Form>
          <Form onSubmit={e => handleAddTag(e)}>
            <FormGroup>
              <Col>
                <Row>
                  <Label>Tags</Label>
                </Row>
                <Row style={{ display: 'flex', flexWrap: 'nowrap' }}>
                  <Input
                    type="text"
                    name="tag"
                    id="url-create-tag-input"
                    bsSize="sm"
                    value={tagInput}
                    onChange={e => handleTagInput(e.target.value)}
                  />
                  <Button type="submit" size="sm">
                    Add
                  </Button>
                </Row>
              </Col>
            </FormGroup>
          </Form>
          {mappedTags}
          {message ? <p style={{ color: 'red' }}>{message}</p> : null}
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => this.toggle()} color="secondary">
            Close
          </Button>
          <Button
            onClick={() => this.handleSubmit()}
            color="primary"
            style={{ width: '80px' }}
          >
            {loading ? <Spinner size="sm" /> : 'Submit'}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    alias: state.createUrl.alias,
    destination: state.createUrl.destination,
    tagInput: state.createUrl.tagInput,
    tags: state.createUrl.tags,
    message: state.createUrl.message,
    loading: state.createUrl.loading,
    display: state.createUrl.display,
    selectedTeam: state.getTeams.selectedTeam,
    user: state.user.user
  };
};

export default connect(
  mapStateToProps,
  {
    handleAlias,
    handleDestination,
    handleTagInput,
    handleTags,
    handleTagsList,
    handleUrls,
    handleMessage,
    handleLoading,
    handleDisplay
  }
)(UrlCreate);
