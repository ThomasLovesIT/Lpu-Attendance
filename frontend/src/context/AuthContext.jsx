import { createContext, useReducer, useEffect } from 'react'; // It's all here!

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    // Standard useReducer or useState here
    const [state, dispatch] = useReducer(authReducer, { 
        user: null 
    });

    //The purpose of this function is whenever you refresh the web, 
    //the frontend remembers the user if there is an existing user in localstorage.
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user){
              dispatch({type: 'LOGIN', payload: user})
        }
    }, [])

 

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}