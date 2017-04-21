import { FirebaseList } from 'src/core/firebase';

import * as mentorActions from './actions';
import { Mentor } from './mentor';


export const mentorList = new FirebaseList({
  onAdd: mentorActions.createMentorSuccess,
  onChange: mentorActions.updateMentorSuccess,
  onLoad: mentorActions.loadMentorsSuccess,
  onRemove: mentorActions.deleteMentorSuccess
}, Mentor);
