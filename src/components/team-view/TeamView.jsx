/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import {
  handleTeams,
  handleResetTeam,
  handleTeamsSelect
} from '../../redux/reducers/team-list-reducer';
import MemberCard from './MemberCard';
import deleteTeam from '../../lib/teams-delete';
import getTeams from '../../lib/teams-get';
import updateTeam from '../../lib/teams-update';

class TeamView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addMemberDisplay: false,
      addMemberInput: ''
    };
  }

  async handleAddMember(e) {
    e.preventDefault();
    const { addMemberInput } = this.state;
    const { selectedTeam, user, handleTeamsSelect, handleTeams } = this.props;

    selectedTeam.members.push(addMemberInput);
    console.log('test');
    await updateTeam(
      selectedTeam.id,
      selectedTeam.title,
      selectedTeam.captain,
      selectedTeam.admins,
      [...new Set(selectedTeam.members)]
    );

    const teams = await getTeams(user.user.username);

    handleTeams(teams);
    const team = teams.filter(team => {
      return team.id === selectedTeam.id;
    });
    handleTeamsSelect(team[0]);
    this.setState({ addMemberDisplay: false, addMemberInput: '' });
  }

  async handleDeleteTeam() {
    const { selectedTeam, user, handleTeams, handleResetTeam } = this.props;

    await deleteTeam(selectedTeam.id);
    handleTeams(await getTeams(user.user.username));
    handleResetTeam();
    this.setState({ addMemberDisplay: false, addMemberInput: '' });
  }

  render() {
    const { selectedTeam, user } = this.props;
    const { addMemberDisplay, addMemberInput } = this.state;

    const mappedMembers = selectedTeam.members.map((member, index) => {
      return <MemberCard member={member} key={index} />;
    });

    return (
      <Container
        style={!selectedTeam.id ? { display: 'none' } : { marginTop: '20px' }}
      >
        <Col>
          <Row style={{ marginBottom: '10px' }}>
            <h1>{selectedTeam.title}</h1>
          </Row>
          <Row
            style={
              selectedTeam.captain === user.user.username
                ? { marginBottom: '10px' }
                : { display: 'none' }
            }
          >
            <Button onClick={() => this.handleDeleteTeam()} color="danger">
              Delete
            </Button>
          </Row>
          <Row>
            <Col>
              <ListGroup flush>{mappedMembers}</ListGroup>
              <ListGroupItem
                style={
                  addMemberDisplay ? { border: 'none' } : { display: 'none' }
                }
              >
                <Form inline onSubmit={e => this.handleAddMember(e)}>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={addMemberInput}
                      size="sm"
                      onChange={e =>
                        this.setState({ addMemberInput: e.target.value })
                      }
                      style={{ marginLeft: '10px' }}
                    />
                    <Button
                      onClick={e => this.handleAddMember(e)}
                      style={{ marginLeft: '10px' }}
                      size="sm"
                      color="primary"
                    >
                      Add
                    </Button>
                    <Button
                      size="sm"
                      onClick={() =>
                        this.setState({
                          addMemberInput: '',
                          addMemberDisplay: false
                        })
                      }
                      style={{ marginLeft: '10px' }}
                    >
                      Cancel
                    </Button>
                  </FormGroup>
                </Form>
              </ListGroupItem>
              <ListGroupItem
                style={
                  selectedTeam.admins.includes(user.user.username) &&
                  !addMemberDisplay
                    ? { border: 'none' }
                    : { display: 'none' }
                }
              >
                <Button
                  color="link"
                  onClick={() => this.setState({ addMemberDisplay: true })}
                >
                  <FontAwesome name="plus" style={{ marginRight: '10px' }} />
                  Add member
                </Button>
              </ListGroupItem>
            </Col>
          </Row>
        </Col>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedTeam: state.getTeams.selectedTeam,
    user: state.user.user
  };
};

export default connect(
  mapStateToProps,
  { handleTeams, handleResetTeam, handleTeamsSelect }
)(TeamView);
