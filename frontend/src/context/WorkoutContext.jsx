import { createContext, useReducer } from 'react';

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS': 
        console.log('state:', state, 'action: ', action)
          return {
            workouts: action.payload
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
        default:
          // console.log('state:', state, 'action: ', action)
          return state
    };
};

export const WorkoutsContextProvider = ({ children }) => {  
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    });

    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    );
};