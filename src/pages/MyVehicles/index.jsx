import { useContext, useEffect, useReducer, useState } from "react";
import { layoutContext } from "../../layouts";
import { useParams } from "react-router-dom";
import { myVehiclesReducer, initialState } from "../../reducers/myVehiclesReducer";
import GridItem from "../../components/GridItem";
import UserProfile from "../../components/UserProfile";
import UpdateProfileModal from "../../components/UpdateProfileModal";

function MyVehicles() {
    const [state, dispatch] = useReducer(myVehiclesReducer, initialState);
    const [updateProfileModalOpen, setUpdateProfileModalOpen] = useState(false);
    const { setPageTitle } = useContext(layoutContext);
    const { id } = useParams();

    const handleCloseUpdateProfileModal = () => {
      setUpdateProfileModalOpen(false);
    };

    const handleOpenUpdateProfileModal = () => {
      setUpdateProfileModalOpen(true);
    }

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
                <GridItem>
                    <UserProfile 
                      userData={state.userVehicles} 
                      openUpdateUserProfileModal={handleOpenUpdateProfileModal}
                    /> 
                </GridItem>

              ) : (
                  <p>Loading...</p>
              )
          }

          <UpdateProfileModal 
            open={updateProfileModalOpen} 
            handleClose={handleCloseUpdateProfileModal}
            userVehiclesDispatch={dispatch}
          />
      </>
    );
}

export default MyVehicles