import { List } from 'immutable';
import { MentorsState } from './reducer';
import { getVisibleMentors } from './selectors';
import { Mentor } from './mentor';


describe('mentors', () => {
  describe('selectors', () => {
    let mentors;

    beforeEach(() => {
      mentors = new MentorsState({
        list: new List([
          new Mentor({completed: false, title: 'mentor-1'}),
          new Mentor({completed: true, title: 'mentor-2'})
        ])
      });
    });


    describe('getVisibleMentors()', () => {
      it('should return list of all mentors', () => {
        let mentorList = getVisibleMentors({mentors});
        expect(mentorList.size).toBe(2);
      });

      it('should return list of active (incomplete) mentors', () => {
        mentors = mentors.set('filter', 'active');
        let mentorList = getVisibleMentors({mentors});

        expect(mentorList.size).toBe(1);
        expect(mentorList.get(0).title).toBe('mentor-1');
      });

      it('should return list of completed mentors', () => {
        mentors = mentors.set('filter', 'completed');
        let mentorList = getVisibleMentors({mentors});

        expect(mentorList.size).toBe(1);
        expect(mentorList.get(0).title).toBe('mentor-2');
      });
    });
  });
});
