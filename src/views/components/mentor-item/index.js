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

    this.delete = ::this.delete;
    this.editTitle = ::this.editTitle;
    this.saveTitle = ::this.saveTitle;
    this.stopEditing = ::this.stopEditing;
    this.toggleStatus = ::this.toggleStatus;
    this.onKeyUp = ::this.onKeyUp;
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
            <svg className={classNames('icon', {'icon--active': mentor.completed})} width="24" height="24" viewBox="0 0 24 24">
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
            </svg>
          </button>
        </div>

        <div className="cell">
          {editing ? this.renderMentorInput(mentor) : this.renderMentor(mentor)}
        </div>

        <div className="cell">
          <button
            aria-hidden={!editing}
            aria-label="Cancel editing"
            className={classNames('btn mentor-item__button', {'hide': !editing})}
            onClick={this.stopEditing}
            ref={c => this.cancelEditButton = c}
            type="button">
            <svg className="icon" width="24" height="24" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              <path d="M0 0h24v24H0z" fill="none"></path>
            </svg>
          </button>
          <button
            aria-hidden={editing}
            aria-label="Edit mentor"
            className={classNames('btn mentor-item__button', {'hide': editing})}
            onClick={this.editTitle}
            ref={c => this.editButton = c}
            type="button">
            <svg className="icon" width="24" height="24" viewBox="0 0 24 24">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
          </button>
          <button
            aria-hidden={editing}
            aria-label="Delete mentor"
            className={classNames('btn mentor-item__button', {'hide': editing})}
            onClick={this.delete}
            ref={c => this.deleteButton = c}
            type="button">
            <svg className="icon" width="24" height="24" viewBox="0 0 24 24">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
}

export default MentorItem;
