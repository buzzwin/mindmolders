import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { paths } from '../../routes';

export class MentorDetail extends Component {



  static propTypes = {
    selectedMentor: PropTypes.object.isRequired,
    goBack: PropTypes.func.isRequired
  };
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  gotoList() {
    const { router } = this.context;
    router.replace(paths.ROOT);
  }

  renderMentor(mentor) {
    return (
      <ul>
        <li>
        {mentor.title}
        </li>
        <li>
        {mentor.organization}
        </li>
        <li>
        {mentor.position}
        </li>
      </ul>
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
    return (
      <div className="g-row">
      <h1>Mentor Details</h1>
      <div>
      {this.renderMentor(this.props.selectedMentor)}
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
    selectedMentor: state.mentors.selectedMentor,
    goBack: ownProps.history.replace
  };
}



export default connect(
  mapStateToProps,
  null
)(MentorDetail);
