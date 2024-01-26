import { DateContext } from "../context/DateContext";
import { useContext } from "react";

export const useDateContext = () => {
    const context = useContext(DateContext);

    if (!context) {
        throw Error('useWorkoutsContext must be used inside a WorkoutsContextProvider')
    }

    return context;
};