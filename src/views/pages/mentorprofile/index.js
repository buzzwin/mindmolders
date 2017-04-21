import { List, Map, Record } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { getNotification, notificationActions } from 'src/core/notification';
import { getMentorFilter, getVisibleMentors, mentorsActions } from 'src/core/mentors';
import Notification from '../../components/notification';
import MentorFilters from '../../components/mentor-filters';
import MentorList from '../../components/mentor-list';
import MentorForm from '../../components/mentor-form';
import MentorItem from '../../components/mentor-item';
import MentorProfileItem from '../../components/mentor-profile-item';

export class MentorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {fetched: false};
  }
  static propTypes = {
    fetchMentorProfile: PropTypes.func.isRequired,
    createMentor: PropTypes.func.isRequired,
    deleteMentor: PropTypes.func.isRequired,
    updateMentor: PropTypes.func.isRequired,
    showDetails: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.fetchMentorProfile(this.props.auth.id)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ fetched: !this.state.fetched });
  }
  componentWillUnmount() {

  }

  renderMentor(mentor, deleteMentor, index, updateMentor, showDetails){
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
        <div>

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
    mentorProfile: state.mentors.mentorProfile,
    auth: state.auth
  };
}

const mapDispatchToProps = Object.assign(
  {},
  mentorsActions,
  notificationActions
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MentorProfile);
