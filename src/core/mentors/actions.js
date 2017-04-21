import { getDeletedMentor } from './selectors';
import { mentorList } from './mentor-list';
import { firebaseDb } from '../firebase/firebase';
import {getAnyObject} from '../firebase/firebase-joins'



import {
  CREATE_MENTOR_ERROR,
  CREATE_MENTOR_SUCCESS,
  DELETE_MENTOR_ERROR,
  DELETE_MENTOR_SUCCESS,
  FILTER_MENTORS,
  LOAD_MENTORS_SUCCESS,
  UNDELETE_MENTOR_ERROR,
  UNLOAD_MENTORS_SUCCESS,
  UPDATE_MENTOR_ERROR,
  UPDATE_MENTOR_SUCCESS,
  SHOW_DETAIL_MENTOR_SUCCESS,
  FETCH_MENTOR_PROFILE_SUCCESS,
  FETCH_MENTOR_PROFILE_ERROR,
  FETCH_MENTOR_PROFILE_PENDING
} from './action-types';


export function createMentor1(title, position, organization) {
  return (dispatch, getState) => {
    const { auth } = getState();
    mentorList.push({userUID: auth.id, completed: false, title, position, organization})
      .catch(error => dispatch(createMentorError(error)));
  };
}

export function createMentor(title, position, organization) {
  return (dispatch, getState) => {
    const { auth } = getState();
    const path   = "mentors";
    const key = auth.id;
    console.log(path);
    firebaseDb.ref(`${path}/${key}`).set({
      userUID: auth.id,
      title: title,
      position: position,
      organization: organization,
      completed: false
    }).catch(error => dispatch(createMentorError(error)));
  };
}

export function createMentorError(error) {
  return {
    type: CREATE_MENTOR_ERROR,
    payload: error
  };
}

export function createMentorSuccess(mentor) {
  return {
    type: CREATE_MENTOR_SUCCESS,
    payload: mentor
  };
}

export function deleteMentor(mentor) {
  return dispatch => {
    mentorList.remove(mentor.key)
      .catch(error => dispatch(deleteMentorError(error)));
  };
}

export function deleteMentorError(error) {
  return {
    type: DELETE_MENTOR_ERROR,
    payload: error
  };
}

export function deleteMentorSuccess(mentor) {
  return {
    type: DELETE_MENTOR_SUCCESS,
    payload: mentor
  };
}

export function undeleteMentor() {
  return (dispatch, getState) => {
    const mentor = getDeletedMentor(getState());
    if (mentor) {
      mentorList.set(mentor.key, {completed: mentor.completed, title: mentor.title})
        .catch(error => dispatch(undeleteMentorError(error)));
    }
  };
}

export function undeleteMentorError(error) {
  return {
    type: UNDELETE_MENTOR_ERROR,
    payload: error
  };
}

export function updateMentorError(error) {
  return {
    type: UPDATE_MENTOR_ERROR,
    payload: error
  };
}

export function updateMentor(mentor, changes) {
  return dispatch => {
    mentorList.update(mentor.key, changes)
      .catch(error => dispatch(updateMentorError(error)));
  };
}



export function updateMentorSuccess(mentor) {
  return {
    type: UPDATE_MENTOR_SUCCESS,
    payload: mentor
  };
}


export function loadMentorsSuccess(mentors) {
  return {
    type: LOAD_MENTORS_SUCCESS,
    payload: mentors
  };
}



export function filterMentors(filterType) {
  return {
    type: FILTER_MENTORS,
    payload: {filterType}
  };
}

export function loadMentors() {
  return dispatch => {
    mentorList.path = 'mentors';
    mentorList.subscribe(dispatch);
  };
}

export function unloadMentors() {
  mentorList.unsubscribe();
  return {
    type: UNLOAD_MENTORS_SUCCESS
  };
}

export function showDetails(mentor) {
  return {
    type: SHOW_DETAIL_MENTOR_SUCCESS,
    payload: mentor
  };
}
export function fetchMentorProfileSuccess(mentorProfile) {
  return {
    type: FETCH_MENTOR_PROFILE_SUCCESS,
    payload: mentorProfile
  };
}
export function fetchMentorProfilePending() {
  return {
    type: FETCH_MENTOR_PROFILE_PENDING
  };
}

export function fetchMentorProfile(key) {
  var  path = "mentors/" + key
  return dispatch => {
    dispatch(fetchMentorProfilePending())
    return firebaseDb.ref(path).once('value', snap => {
      var mentorProfile = snap.val();
      dispatch(fetchMentorProfileSuccess(mentorProfile))
    })
    .catch((error) => {
      console.log(error);
    });
  }
}
