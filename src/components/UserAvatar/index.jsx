import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';

function UserAvatar({userData, size = 40}) {
  const navigate = useNavigate(); 

  const handleClick = (event) => {
    navigate(`/myvehicles/${event.currentTarget.dataset.id}`);
  };

  return (
    <Tooltip title={userData.name}>
      <IconButton sx={{ p: 0 }} onClick={handleClick} data-id={userData.id}>
        <Avatar 
          alt={userData.name} 
          src={`${import.meta.env.VITE_REACT_APP_SERVER_URL}/images/${userData.image}`} 
          sx={{ width: size, height: size }}
        />
      </IconButton>
    </Tooltip>
  );  
}

export default UserAvatar;