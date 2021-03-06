import { isAuthenticated } from 'src/core/auth';
import App from './app';
import SignIn from './pages/sign-in';
import Tasks from './pages/tasks';
import Mentors from './pages/mentors';
import MentorDetail from './pages/mentordetail';
import MentorProfile from './pages/mentorprofile';

export const paths = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  TASKS: '/',
  MENTORS: '/',
  MENTORDETAIL: '/mentordetail',
  MENTORPROFILE: '/mentorprofile'
};


const requireAuth = getState => {
  return (nextState, replace) => {
    if (!isAuthenticated(getState())) {
      replace(paths.SIGN_IN);
    }
  };
};

const requireUnauth = getState => {

  return (nextState, replace) => {
    if (isAuthenticated(getState())) {
      replace(paths.MENTORS);
    }
  };
};

export const getRoutes = getState => {
  return {
    path: paths.ROOT,
    component: App,
    childRoutes: [
      {
        indexRoute: {
          component: Mentors,
          onEnter: requireAuth(getState)
        }
      },
      {
        path: paths.SIGN_IN,
        component: SignIn,
        onEnter: requireUnauth(getState)
      },
      {
        path: paths.TASKS,
        component: Tasks,
        onEnter: requireUnauth(getState)
      },
      {
        path: paths.MENTORDETAIL,
        component: MentorDetail
      },
      {
        path: paths.MENTORPROFILE,
        component: MentorProfile
      }
    ]
  };
};
