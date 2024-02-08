import { configureStore } from '@reduxjs/toolkit';
import workoutsReducer from './slices/workoutsSlice';
import dateReducer from './slices/dateSlice';

export default configureStore({
  reducer: {
    workouts: workoutsReducer,
    date: dateReducer,
  },
});