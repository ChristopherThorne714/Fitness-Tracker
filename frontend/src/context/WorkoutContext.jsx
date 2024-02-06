import { createContext, useReducer } from 'react';
var currentDate = new Date();

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS': 
        // console.log('state:', state, 'action: ', action)
          return {
            workouts: action.payload,
          }
        case 'CREATE_WORKOUT':
          // console.log('state:', state, 'action: ', action)
          return {
            workouts: [action.payload, ...state.workouts]
          }
        case 'DELETE_WORKOUT':
          // console.log('state:', state, 'action: ', action)
          return {
            workouts: state.workouts.filter((w) => w._id !== action.payload._id)
          }
        case 'SET_DATE': 
          // console.log('state:', state, 'action: ', action)
          return {
            date: action.payload
          }
        case 'SET_DATE_RANGE': 
        // console.log('state:', state, 'action: ', action)
          return {
            dateRange: action.payload
          }
        default:
          // console.log('state:', state, 'action: ', action)
          return state
    };
};

export const WorkoutsContextProvider = ({ children }) => {  
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null,
        date: currentDate.toISOString().split('T')[0],
        dateRange: []
    });

    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    );
};