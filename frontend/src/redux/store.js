import { configureStore } from '@reduxjs/toolkit';
import workoutsReducer from './slices/workoutsSlice';
import dateReducer from './slices/dateSlice';
import dateRangeReducer from './slices/dateRangeSlice';
import authReducer from './slices/authSlice';

export default configureStore({
  reducer: {
    workouts: workoutsReducer,
    date: dateReducer,
    dateRange: dateRangeReducer,
    auth: authReducer,
  },
});