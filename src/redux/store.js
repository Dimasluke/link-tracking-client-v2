import { createStore, combineReducers } from 'redux';
import createTeam from './reducers/team-create-reducer';
import getTeams from './reducers/team-list-reducer';
import updateTeam from './reducers/team-update-reducer';
import deleteTeam from './reducers/team-delete-reducer';
import createUrl from './reducers/url-create-reducer';
import getUrls from './reducers/url-list-reducer';
import updateUrl from './reducers/url-update-reducer';
import deleteUrl from './reducers/url-delete-reducer';
import user from './reducers/user-reducer';
import visits from './reducers/visit-filter-reducer';

const rootReducer = combineReducers({
  createTeam,
  getTeams,
  updateTeam,
  deleteTeam,
  createUrl,
  getUrls,
  updateUrl,
  deleteUrl,
  user,
  visits
});

export default createStore(rootReducer);
