import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { paths } from '../../routes';

export class MentorDetail extends Component {

  constructor(props, context) {
    super(props, context);
  }

  static propTypes = {
    selectedMentor: PropTypes.object.isRequired,
    goBack: PropTypes.func.isRequired
  };
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentWillMount() {
  }

  componentWillUnmount() {

  }
  gotoList() {
    const { router } = this.context;
    router.replace(paths.ROOT);
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
