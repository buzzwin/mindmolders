import { List } from 'immutable';
import { SIGN_OUT_SUCCESS } from 'src/core/auth';

import {
  CREATE_MENTOR_SUCCESS,
  DELETE_MENTOR_SUCCESS,
  FILTER_MENTORS,
  LOAD_MENTORS_SUCCESS,
  UPDATE_MENTOR_SUCCESS
} from './action-types';

import { Mentor } from './mentor';
import { mentorsReducer, MentorsState } from './reducer';


describe('mentors', () => {
  describe('mentorsReducer', () => {
    let mentor1;
    let mentor2;

    beforeEach(() => {
      mentor1 = new Mentor({completed: false, key: '0', title: 'mentor 1'});
      mentor2 = new Mentor({completed: false, key: '1', title: 'mentor 2'});
    });


    describe('CREATE_MENTOR_SUCCESS', () => {
      it('should prepend new mentor to list', () => {
        let state = new MentorsState({list: new List([mentor1])});

        let nextState = mentorsReducer(state, {
          type: CREATE_MENTOR_SUCCESS,
          payload: mentor2
        });

        expect(nextState.list.get(0)).toBe(mentor2);
        expect(nextState.list.get(1)).toBe(mentor1);
      });
    });


    describe('DELETE_MENTOR_SUCCESS', () => {
      it('should remove mentor from list', () => {
        let state = new MentorsState({list: new List([mentor1, mentor2])});

        let nextState = mentorsReducer(state, {
          type: DELETE_MENTOR_SUCCESS,
          payload: mentor2
        });

        expect(nextState.deleted).toBe(mentor2);
        expect(nextState.list.size).toBe(1);
        expect(nextState.list.get(0)).toBe(mentor1);
        expect(nextState.previous).toBe(state.list);
      });
    });


    describe('FILTER_MENTORS', () => {
      it('should set filter with provided value', () => {
        let state = new MentorsState();

        let nextState = mentorsReducer(state, {
          type: FILTER_MENTORS,
          payload: {
            filterType: 'completed'
          }
        });

        expect(nextState.filter).toBe('completed');
      });
    });


    describe('LOAD_MENTORS_SUCCESS', () => {
      it('should set mentor list', () => {
        let state = new MentorsState();

        let nextState = mentorsReducer(state, {
          type: LOAD_MENTORS_SUCCESS,
          payload: [mentor1, mentor2]
        });

        expect(nextState.list.size).toBe(2);
      });

      it('should order mentors newest first', () => {
        let state = new MentorsState();

        let nextState = mentorsReducer(state, {
          type: LOAD_MENTORS_SUCCESS,
          payload: [mentor1, mentor2]
        });

        expect(nextState.list.get(0)).toBe(mentor2);
        expect(nextState.list.get(1)).toBe(mentor1);
      });
    });


    describe('UPDATE_MENTOR_SUCCESS', () => {
      it('should update mentor', () => {
        let state = new MentorsState({list: new List([mentor1, mentor2])});
        let changedMentor = mentor2.set('title', 'changed');

        let nextState = mentorsReducer(state, {
          type: UPDATE_MENTOR_SUCCESS,
          payload: changedMentor
        });

        expect(nextState.list.get(0)).toBe(mentor1);
        expect(nextState.list.get(1)).toBe(changedMentor);
      });
    });


    describe('SIGN_OUT_SUCCESS', () => {
      it('should reset state', () => {
        let state = new MentorsState({
          delete: mentor1,
          list: new List([mentor1, mentor2]),
          previous: new List()
        });

        let nextState = mentorsReducer(state, {
          type: SIGN_OUT_SUCCESS
        });

        expect(nextState.deleted).toBe(null);
        expect(nextState.list.size).toBe(0);
        expect(nextState.previous).toBe(null);
      });
    });
  });
});
