import React, { Component, PropTypes } from 'react';


class MentorForm extends Component {
  static propTypes = {
    createMentor: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {title: '', position: '', organization: ''};

    this.onChange = ::this.onChange;
    this.onKeyUp = ::this.onKeyUp;
    this.onSubmit = ::this.onSubmit;
  }

  clearInput() {
    this.setState({title: '', position: '', organization: ''});
  }

  onChange(event) {
    if (event.target.id === 'position') {
      this.setState({position: event.target.value });
    }
    else if (event.target.id === 'title') {
      this.setState({title: event.target.value });
    }
    else if (event.target.id === 'organization') {
      this.setState({organization: event.target.value });
    }
  }

  onKeyUp(event) {
    if (event.keyCode === 27) {
      this.clearInput();
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const title = this.state.title.trim();
    const position = this.state.position.trim();
    const organization = this.state.organization.trim();
    if (title.length) this.props.createMentor(title, position, organization);
    this.clearInput();
  }

  render() {
    return (
      <form className="mentor-form" onSubmit={this.onSubmit} noValidate>
        <input
          id="title"
          autoComplete="off"
          autoFocus
          className="mentor-form__input"
          maxLength="64"
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          placeholder="Mentor Name"
          ref={c => this.titleInput = c}
          type="text"
          value={this.state.title}
        />
        <input
          id="position"
          autoComplete="off"
          autoFocus
          className="mentor-form__input"
          maxLength="64"
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          placeholder="Title or Skill"
          ref={c => this.positionInput = c}
          type="text"
          value={this.state.position}
        />
        <input
          id="organization"
          autoComplete="off"
          autoFocus
          className="mentor-form__input"
          maxLength="64"
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          placeholder="Company/Organization"
          ref={c => this.organizationInput = c}
          type="text"
          value={this.state.organization}
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default MentorForm;
