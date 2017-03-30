import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Mentor } from 'src/core/mentors';


class MentorItem extends Component {
  static propTypes = {
    deleteMentor: PropTypes.func.isRequired,
    mentor: PropTypes.instanceOf(Mentor).isRequired,
    updateMentor: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {editing: false};
    this.state = {showDetails: false};

    this.delete = ::this.delete;
    this.editTitle = ::this.editTitle;
    this.saveTitle = ::this.saveTitle;
    this.stopEditing = ::this.stopEditing;
    this.toggleStatus = ::this.toggleStatus;
    this.onKeyUp = ::this.onKeyUp;
    this.showDetails = ::this.showDetails;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.mentor !== this.props.mentor ||
           nextState.editing !== this.state.editing;
  }

  delete() {
    this.props.deleteMentor(this.props.mentor);
  }

  editTitle() {
    this.setState({editing: true});
  }
  showDetails() {
    this.setState({showDetails: true});
  }
  renderDetails() {
    this.setState({showDetails: false});
  }
  saveTitle(event) {
    if (this.state.editing) {
      const { mentor } = this.props;
      const title = event.target.value.trim();

      if (title.length && title !== mentor.title) {
        this.props.updateMentor(mentor, {title});
      }

      this.stopEditing();
    }
  }

  stopEditing() {
    this.setState({editing: false});
  }

  toggleStatus() {
    let checked = !this.props.mentor.completed;
    this.props.updateMentor(this.props.mentor, {completed: checked});
  }

  onKeyUp(event) {
    if (event.keyCode === 13) {
      this.saveTitle(event);
    }
    else if (event.keyCode === 27) {
      this.stopEditing();
    }
  }

  renderTitle(mentor) {
    return (
      <div
        className="mentor-item__title"
        ref={c => this.titleText = c}
        tabIndex="0">{mentor.title}
      </div>
    );
  }

  renderMentor(mentor) {
    return (
      <div>
        <div
        className="mentor-item__title"
        ref={c => this.titleText = c}
        tabIndex="0">{mentor.title}
        </div>
        &nbsp;
        <div
        className="mentor-item__position"
        ref={c => this.titleText = c}
        tabIndex="0">{mentor.position}
        </div>
        <div
        className="mentor-item__position"
        ref={c => this.titleText = c}
        tabIndex="0">{mentor.organization}
        </div>
      </div>
    );
  }

  renderTitleInput(mentor) {
    return (
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
    );
  }

  renderMentorInput(mentor) {
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

  render() {
    const { editing } = this.state;
    const { mentor } = this.props;

    return (
      <div className={classNames('mentor-item', {'mentor-item--completed': mentor.completed, 'mentor-item--editing': editing})} tabIndex="0">
        <div className="cell">
          <button
            aria-hidden={editing}
            aria-label="Mark mentor as completed"
            className={classNames('btn mentor-item__button', {'hide': editing})}
            onClick={this.toggleStatus}
            ref={c => this.toggleStatusButton = c}
            type="button">
            <svg className={classNames('fa-icon fa-info-circle', {'icon--active': mentor.completed})} width="24" height="24" viewBox="0 0 24 24">
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
            </svg>
          </button>
        </div>

        <div className="cell">
          {editing ? this.renderMentorInput(mentor) : this.renderMentor(mentor)}
        </div>

        <div className="cell">

          <button
            aria-label="Show Mentors Detail"
            className={classNames('btn mentor-item__button', {'hide': editing})}
            onClick={this.showDetails}
            ref={c => this.detailsButton = c}
            type="button">
            <svg className="icon" width="40" height="40" viewBox="0 0 40 40">
            <path d="m25.9 30.7v-3.6q0-0.3-0.2-0.5t-0.6-0.2h-2.1v-11.4q0-0.3-0.2-0.5t-0.5-0.2h-7.2q-0.3 0-0.5 0.2t-0.2 0.5v3.6q0 0.3 0.2 0.5t0.5 0.2h2.2v7.1h-2.2q-0.3 0-0.5 0.2t-0.2 0.5v3.6q0 0.3 0.2 0.5t0.5 0.2h10q0.4 0 0.6-0.2t0.2-0.5z m-2.9-20v-3.6q0-0.3-0.2-0.5t-0.5-0.2h-4.3q-0.3 0-0.5 0.2t-0.2 0.5v3.6q0 0.3 0.2 0.5t0.5 0.2h4.3q0.3 0 0.5-0.2t0.2-0.5z m14.3 9.3q0 4.7-2.3 8.6t-6.3 6.2-8.6 2.3-8.6-2.3-6.2-6.2-2.3-8.6 2.3-8.6 6.2-6.2 8.6-2.3 8.6 2.3 6.3 6.2 2.3 8.6z"></path>
            </svg>
          </button>

        </div>
      </div>
    );
  }
}

export default MentorItem;
