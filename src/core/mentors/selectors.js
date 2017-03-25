import { createSelector } from 'reselect';


export function getMentors(state) {
  return state.mentors;
}

export function getMentorList(state) {
  return getMentors(state).list;
}

export function getMentorFilter(state) {
  return getMentors(state).filter;
}

export function getDeletedMentor(state) {
  return getMentors(state).deleted;
}


//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getVisibleMentors = createSelector(
  getMentorList,
  getMentorFilter,
  (mentors, filter) => {
    switch (filter) {
      case 'active':
        return mentors.filter(mentor => !mentor.completed);

      case 'completed':
        return mentors.filter(mentor => mentor.completed);

      default:
        return mentors;
    }
  }
);
