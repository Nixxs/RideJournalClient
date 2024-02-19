import { useContext, useEffect, useReducer } from "react";
import { layoutContext } from "../../layouts";
import { useParams } from "react-router-dom";
import { userProfileReducer, initialState } from "../../reducers/userProfileReducer";
import { useAuth } from "../../features/AuthManager";


function UserProfile() {
    const { authState } = useAuth();
    const [state, dispatch] = useReducer(userProfileReducer, initialState);
    const { setPageTitle } = useContext(layoutContext);
    const { id } = useParams();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/users/${id}/vehicles`)
        .then((response) => response.json())
        .then((data) => {
          switch (data.result) {
            case 200:
              dispatch({ type: "GET_USER_VEHICLES_SUCCESS", payload: data.data });
              setPageTitle(data.data.name);
              break;
            case 404:
              dispatch({ type: "GET_USER_VEHICLES_FAILURE", payload: "User not found" });
              break;
            default:
              dispatch({ type: "GET_USER_VEHICLES_FAILURE", payload: data.message });
              break;
          }
        })
        .catch((error) =>
          dispatch({ type: "GET_USER_VEHICLES_FAILURE", payload: error.message })
        );

        
    }, [setPageTitle]);

    return (
        <>
            {(state.userVehicles) ? 
                (
                    <p>User Profile: {state.userVehicles.profile}</p>
                ) : (
                    <p>Loading...</p>
                )
            }  
        </>

    );
}

export default UserProfile