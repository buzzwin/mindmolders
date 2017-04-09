import { List, Record } from 'immutable';

import {
  SIGN_OUT_SUCCESS
} from 'src/core/auth';

import {
  CREATE_MENTOR_SUCCESS,
  DELETE_MENTOR_SUCCESS,
  FILTER_MENTORS,
  LOAD_MENTORS_SUCCESS,
  UPDATE_MENTOR_SUCCESS,
  SHOW_DETAIL_MENTOR_SUCCESS
} from './action-types';


export const MentorsState = new Record({
  deleted: null,
  filter: '',
  list: new List(),
  previous: null,
  showDetails: false,
  selectedMentor: null
});


export function mentorsReducer(state = new MentorsState(), {payload, type}) {
  switch (type) {
    case CREATE_MENTOR_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.deleted && state.deleted.key === payload.key ?
              state.previous :
              state.list.unshift(payload)
      });

    case DELETE_MENTOR_SUCCESS:
      return state.merge({
        deleted: payload,
        previous: state.list,
        list: state.list.filter(mentor => mentor.key !== payload.key)
      });

    case FILTER_MENTORS:
      return state.set('filter', payload.filterType || '');

    case LOAD_MENTORS_SUCCESS:
      return state.set('list', new List(payload.reverse()));

    case UPDATE_MENTOR_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.list.map(mentor => {
          return mentor.key === payload.key ? payload : mentor;
        })
      });
    case SHOW_DETAIL_MENTOR_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        selectedMentor: payload
      });


    case SIGN_OUT_SUCCESS:
      return new MentorsState();

    default:
      return state;
  }
}
