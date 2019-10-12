import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

class TeamUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async toggle() {}

  render() {
    const { display } = this.props;

    return (
      <Modal isOpen={display} toggle={() => this.toggle()}>
        <ModalHeader toggle={() => this.toggle()}>Update Team</ModalHeader>
        <ModalBody>body</ModalBody>
        <ModalFooter>
          <Button>Submit</Button>
          <Button>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    display: state.updateTeam.display
  };
};

export default connect(
  mapStateToProps,
  null
)(TeamUpdate);
