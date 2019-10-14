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
  Button
} from 'reactstrap';
import {
  handleTitle,
  handleOwner,
  handleDisplay
} from '../../redux/reducers/team-create-reducer';
import createTeam from '../../lib/teams-create';
import getTeams from '../../lib/teams-get';
import {
  handleTeams,
  handleResetTeam
} from '../../redux/reducers/team-list-reducer';

class TeamCreate extends Component {
  async toggle() {
    const { display, handleTitle, handleOwner, handleDisplay } = this.props;

    handleTitle(undefined);
    handleOwner(undefined);
    handleDisplay(!display);
  }

  async handleSubmit(e) {
    e.preventDefault();

    const {
      user,
      title,
      display,
      handleDisplay,
      handleTitle,
      handleTeams,
      handleResetTeam
    } = this.props;

    await createTeam(title, user.user.username);
    handleTitle('');
    handleDisplay(!display);
    handleTeams(await getTeams(user.user.username));
    handleResetTeam();
  }

  render() {
    const { display, title, handleTitle } = this.props;

    return (
      <Modal isOpen={display} toggle={() => this.toggle()}>
        <ModalHeader toggle={() => this.toggle()}>Create Team</ModalHeader>
        <ModalBody>
          <Form onSubmit={e => this.handleSubmit(e)}>
            <FormGroup>
              <Label>Team title</Label>
              <Input
                type="text"
                name="title"
                id="team-create-title"
                bsSize="sm"
                value={title}
                onChange={e => handleTitle(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => this.toggle()}>Cancel</Button>
          <Button
            type="submit"
            onClick={e => this.handleSubmit(e)}
            color="primary"
          >
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    display: state.createTeam.display,
    title: state.createTeam.title,
    user: state.user.user
  };
};

export default connect(
  mapStateToProps,
  { handleTitle, handleOwner, handleDisplay, handleTeams, handleResetTeam }
)(TeamCreate);
