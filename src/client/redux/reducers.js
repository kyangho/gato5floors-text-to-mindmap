import { combineReducers } from '@reduxjs/toolkit';

import user from './features/user';
import note from './features/note';
import demo from './features/demo';
export default combineReducers({
  user,
  note,
  demo
});
