/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
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
  Spinner
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import {
  handleDisplay,
  handleUpdatedAlias,
  handleUpdatedDestination,
  handleUpdatedTags,
  handleUpdateTagInput
} from '../../redux/reducers/url-update-reducer';
import { handleUrls } from '../../redux/reducers/url-list-reducer';
import { handleTagsList } from '../../redux/reducers/tags-list-reducer';
import updateUrl from '../../lib/urls-update';
import getUrls from '../../lib/urls-get';
import getTags from '../../lib/tags-get';

class UrlUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = { updatedTags: [] };
  }

  async toggle() {
    const {
      display,
      handleDisplay,
      handleUpdatedAlias,
      handleUpdatedDestination,
      handleUpdatedTags
    } = this.props;

    handleUpdatedAlias('');
    handleUpdatedDestination('');
    handleUpdatedTags([]);
    handleDisplay(!display);
  }

  async handleRemoveTag(e, title) {
    e.preventDefault();

    const { updatedTags, handleUpdatedTags } = this.props;
    const indexOf = updatedTags.findIndex(tag => {
      return tag.title === title;
    });
    updatedTags.splice(indexOf, 1);
    handleUpdatedTags(updatedTags);
    this.setState({ updatedTags });
  }

  async handleSubmit() {
    const {
      user,
      selectedUrl,
      selectedTeam,
      updatedAlias,
      updatedDestination,
      updatedTags,
      handleUrls,
      handleTagsList
    } = this.props;

    const owner = selectedTeam.id
      ? { type: 'team', id: selectedTeam.title }
      : { type: 'user', id: user.user.username };

    const tags = updatedTags.map(tag => {
      return { title: tag.title, owner };
    });

    await updateUrl(selectedUrl.alias, updatedAlias, updatedDestination, tags);
    handleUrls(await getUrls(owner.id));
    handleTagsList(await getTags(owner.id));
    this.toggle();
  }

  render() {
    const {
      display,
      updatedAlias,
      updatedDestination,
      updatedTags,
      tagInput,
      handleUpdatedTags,
      handleUpdateTagInput
    } = this.props;

    const handleAddTag = async function(e) {
      e.preventDefault();

      updatedTags.push({ title: tagInput });
      handleUpdatedTags(updatedTags);
      handleUpdateTagInput('');
    };

    const mappedTags = updatedTags
      ? updatedTags.map((tag, index) => {
          return (
            <Badge
              key={index}
              style={{ marginRight: '10px' }}
              onClick={e => this.handleRemoveTag(e, tag.title)}
            >
              {tag.title} <FontAwesome name="times" />
            </Badge>
          );
        })
      : null;

    return (
      <Modal isOpen={display} toggle={() => this.toggle()}>
        <ModalHeader toggle={() => this.toggle()}>Update URL</ModalHeader>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    selectedUrl: state.getUrls.selectedUrl,
    selectedTeam: state.getTeams.selectedTeam,
    updatedAlias: state.updateUrl.updatedAlias,
    updatedDestination: state.updateUrl.updatedDestination,
    updatedTags: state.updateUrl.updatedTags,
    display: state.updateUrl.display
  };
};

export default connect(
  mapStateToProps,
  {
    handleDisplay,
    handleUpdatedAlias,
    handleUpdatedDestination,
    handleUpdatedTags,
    handleUpdateTagInput,
    handleUrls,
    handleTagsList
  }
)(UrlUpdate);
