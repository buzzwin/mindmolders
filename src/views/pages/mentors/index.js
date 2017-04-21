import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { getNotification, notificationActions } from 'src/core/notification';
import { getMentorFilter, getVisibleMentors, mentorsActions } from 'src/core/mentors';
import Notification from '../../components/notification';
import MentorFilters from '../../components/mentor-filters';
import MentorList from '../../components/mentor-list';
import MentorForm from '../../components/mentor-form';

export class Mentors extends Component {
  static propTypes = {
    createMentor: PropTypes.func.isRequired,
    deleteMentor: PropTypes.func.isRequired,
    dismissNotification: PropTypes.func.isRequired,
    filterMentors: PropTypes.func.isRequired,
    filterType: PropTypes.string.isRequired,
    loadMentors: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,

    notification: PropTypes.object.isRequired,
    mentors: PropTypes.instanceOf(List).isRequired,
    undeleteMentor: PropTypes.func.isRequired,
    unloadMentors: PropTypes.func.isRequired,
    updateMentor: PropTypes.func.isRequired,
    showDetails: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.loadMentors();
    this.props.filterMentors(this.props.location.query.filter);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.query.filter !== this.props.location.query.filter) {
      this.props.filterMentors(nextProps.location.query.filter);
    }
  }
  componentWillUnmount() {
    this.props.unloadMentors();
  }

  renderNotification() {
    const { notification } = this.props;

    return (
      <Notification
        action={this.props.undeleteMentor}
        actionLabel={notification.actionLabel}
        dismiss={this.props.dismissNotification}
        display={notification.display}
        message={notification.message}
      />
    );
  }

  render() {

    return (
      <div className="g-row">
        <div className="g-col">
           <MentorForm createMentor={this.props.createMentor} />
        </div>

        <div className="g-col">
          <MentorFilters filter={this.props.filterType} />
          <MentorList
            deleteMentor={this.props.deleteMentor}
            mentors={this.props.mentors}
            updateMentor={this.props.updateMentor}
            showDetails={this.props.showDetails}
          />
        </div>

        {this.props.notification.display ? this.renderNotification() : null}
      </div>
    );
  }
}


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
  getNotification,
  getMentorFilter,
  getVisibleMentors,
  (notification, filterType, mentors) => ({
    notification,
    filterType,
    mentors
  })
);

const mapDispatchToProps = Object.assign(
  {},
  mentorsActions,
  notificationActions
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mentors);
