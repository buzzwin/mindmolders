import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {mentorsActions } from 'src/core/mentors';
import MentorProfileItem from '../../components/mentor-profile-item';
import { paths } from '../../routes';

export class MentorProfile extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    mentorProfile: PropTypes.object.isRequired,
    fetchMentorProfile: PropTypes.func.isRequired,
    createMentor: PropTypes.func.isRequired,
    deleteMentor: PropTypes.func.isRequired,
    updateMentor: PropTypes.func.isRequired,
    showDetails: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {fetched: false};
  }

  componentWillMount() {
    this.props.fetchMentorProfile(this.props.auth.id);
  }
  gotoList() {
    const { router } = this.context;
    router.replace(paths.ROOT);
  }

  componentWillReceiveProps() {
    this.setState({ fetched: !this.state.fetched });
  }

  componentWillUnmount() {
  }

  renderMentor(mentor, deleteMentor, index, updateMentor, showDetails) {
    if (mentor) {
      return (
        <MentorProfileItem
        deleteMentor={deleteMentor}
        key={index}
        mentor={mentor}
        updateMentor={updateMentor}
        showDetails={showDetails}
        />
      );
    }
  }

  renderMentorInput(mentor) {
    if (mentor) {
      return (
      <div>
        <input
          autoComplete="off"
          autoFocus
          className="mentor-item__input"
          defaultValue={mentor.title}
          maxLength="64"
          onBlur={this.saveTitle}
          onKeyUp={this.onKeyUp}
          ref={c => this.titleInput = c}
          type="text"
        />
        <input
          autoComplete="off"
          autoFocus
          className="mentor-item__input"
          defaultValue={mentor.position}
          maxLength="64"
          onBlur={this.savePosition}
          onKeyUp={this.onKeyUp}
          ref={c => this.positionInput = c}
          type="text"
        />
       </div>
      );
    }
  }

  render() {
    return (
      <div className="g-row">
      <h1>My Profile</h1>
        <div>
          {this.renderMentor(this.props.mentorProfile, this.props.deleteMentor, 1, this.props.updateMentor, this.props.showDetails)}
        </div>
        <button className="btn sign-in__button" onClick={() => this.gotoList()}>Back To List </button>
      </div>
    );
  }
}

//=====================================
//  CONNECT
//-------------------------------------

function mapStateToProps(state, ownProps) {
  return {
    auth: state.auth,
    mentorProfile: state.mentors.mentorProfile,
    goBack: ownProps.history.replace
  };
}

const mapDispatchToProps = Object.assign(
  {},
  mentorsActions,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MentorProfile);
