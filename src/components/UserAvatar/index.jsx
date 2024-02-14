import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useReducer } from 'react';
import { userReducer, initialState } from '../../reducers/userReducer';
import { useNavigate } from 'react-router-dom';

function UserAvatar({userId}) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/users/${userId}`
    )
      .then((response) => response.json())
      .then((userData) => {
        switch (userData.result) {
          case 200:
            dispatch({
              type: "GET_USER_SUCCESS",
              payload: userData.data,
            });
            break;
          case 404:
            dispatch({
              type: "GET_USER_FAILURE",
              payload: userData.message,
            });
            break;
          case 500:
            dispatch({
              type: "GET_USER_FAILURE",
              payload: userData.message,
            });
            break;
          default:
            dispatch({
              type: "GET_USER_FAILURE",
              payload: userData.message,
            });
            break;
        }
      })
      .catch((error) =>
        dispatch({ type: "GET_USER_FAILURE", payload: error.message })
      );
  }, []);

  const handleClick = (event) => {
    navigate(`/profile/${event.currentTarget.dataset.id}`);
  };

  return (
    state.userDetails ? (
      <Tooltip title={state.userDetails.name}>
        <IconButton sx={{ p: 0 }} onClick={handleClick} data-id={state.userDetails.id}>
          <Avatar alt={state.userDetails.name} src={`${import.meta.env.VITE_REACT_APP_SERVER_URL}/images/${state.userDetails.image}`} />
        </IconButton>
      </Tooltip>
    ) : null
  );  
}

export default UserAvatar;