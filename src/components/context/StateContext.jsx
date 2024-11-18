import React, { createContext, useReducer } from 'react'
import reducer, { initialGlobalState } from './reducer';

export const State = createContext(null);



export default function StateContext({ children }) {
    const [state, dispatch] = useReducer(reducer, initialGlobalState);

    return (
        <State.Provider value={{ state, dispatch }}>
            {children}
        </State.Provider>
    )
}