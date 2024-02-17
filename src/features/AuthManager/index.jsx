import { createContext, useReducer, useContext } from "react";
import { authReducer, initialState } from "../../reducers/authReducer";

const AuthContext = createContext();

const login = async (dispatch, email, password) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (data.result === 200) {
            dispatch({ type: "LOGIN_SUCCESS", payload: data.data });
        } else {
            dispatch({ type: "LOGIN_FAILURE", payload: data.message });
        }
    } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: `something went wrong: ${error}` });
    }
}

const logout = (dispatch) => {
    dispatch({ type: "LOGOUT" });
}

const AuthProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, initialState);
    return (
        <AuthContext.Provider value={{ authState, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    const context = useContext(AuthContext);
    if(context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}

export {AuthProvider, useAuth, login, logout}