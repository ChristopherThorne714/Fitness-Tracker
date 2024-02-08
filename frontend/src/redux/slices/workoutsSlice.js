import { createSlice } from '@reduxjs/toolkit'

export const workoutsSlice = createSlice({
    name: 'workouts',
    initialState: {
        value: null
    },
    reducers: {
        setWorkouts: (state, action) => {
            state.value = action.payload
        },
        createWorkout: (state, action) => {
            state += action.payload
        },
        deleteWorkout: (state, action) => {
            state -= action.payload
        },
    },
});

export const { setWorkouts, createWorkout, deleteWorkout } = workoutsSlice.actions;

export default workoutsSlice.reducer;