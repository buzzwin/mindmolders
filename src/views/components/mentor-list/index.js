import React, { PropTypes } from 'react';
import { List } from 'immutable';
import MentorItem from '../mentor-item';


function MentorList({deleteMentor, mentors, showDetails, updateMentor}) {


  let mentorItems = mentors.map((mentor, index) => {
    return (
      <MentorItem
        deleteMentor={deleteMentor}
        key={index}
        mentor={mentor}
        updateMentor={updateMentor}
        showDetails={showDetails}
      />
    );
  });

  return (
    <div className="mentor-list">
      {mentorItems}
    </div>
  );
}

MentorList.propTypes = {
  deleteMentor: PropTypes.func.isRequired,
  mentors: PropTypes.instanceOf(List).isRequired,
  showDetails: PropTypes.func.isRequired,
  updateMentor: PropTypes.func.isRequired


};

export default MentorList;
