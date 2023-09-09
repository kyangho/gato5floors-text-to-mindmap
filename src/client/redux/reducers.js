import { combineReducers } from '@reduxjs/toolkit';

import user from './features/user';
import demo from './features/demo';
export default combineReducers({
  user,
  demo
});
