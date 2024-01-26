import { createContext, useReducer } from 'react';
import dayjs from 'dayjs';
const currentDate = dayjs();

export const DateContext = createContext();

export const dateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATE': 
        console.log('state:', state, 'action: ', action)
          return {
            date: action.payload
          }
        default:
          console.log('state:', state, 'action: ', action)
          return state
    };
};

export const DateContextProvider = ({ children }) => {  
    const [state, dispatch] = useReducer(dateReducer, {
        date: currentDate.format('YYYY-MM-DD')
    });

    return (
        <DateContext.Provider value={{...state, dispatch}}>
            { children }
        </DateContext.Provider>
    );
};