import { createContext, useReducer, useContext, useEffect } from "react";
import { authReducer, initialState } from "../../reducers/authReducer";
import { setItem, getItem, clearStorage } from "../../utils/storage";

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
            setItem('authState', JSON.stringify(data.data));
            return("success");
        } else {
            dispatch({ type: "LOGIN_FAILURE", payload: data });
            return(data.errors[0].msg);
        }
    } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: `something went wrong: ${error}` });
    }
}

const logout = (dispatch) => {
    clearStorage();
    dispatch({ type: "LOGOUT" });
}

const AuthProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const storedAuthState = getItem('authState');
        if (storedAuthState) {
            dispatch({ type: "LOGIN_SUCCESS", payload: JSON.parse(storedAuthState) });
        }
    }, []);

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