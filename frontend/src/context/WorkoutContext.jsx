import { createContext } from 'react';

export const WorkoutsContext = createContext();


export const WorkoutsContextProvider = ({ children }) => {
    
    return (
        <WorkoutsContext.Provider>
            { children }
        </WorkoutsContext.Provider>
    )
}