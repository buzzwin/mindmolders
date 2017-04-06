import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export class MentorDetail extends Component {
  static propTypes = {
    selectedMentor: PropTypes.object.isRequired
  };
  
  componentWillMount() {
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className="g-row">
      <h1>Mentor Details</h1>
        <div>
          <ul>
            <li>
            {this.props.selectedMentor.title}
            </li>
            <li>
            {this.props.selectedMentor.organization}
            </li>
            <li>
            {this.props.selectedMentor.position}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}


//=====================================
//  CONNECT
//-------------------------------------
function mapStateToProps(state) {

  return {
    selectedMentor: state.mentors.selectedMentor
  };
}



export default connect(
  mapStateToProps,
  null
)(MentorDetail);
