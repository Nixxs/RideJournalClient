import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useAuth } from "../../features/AuthManager";
import UserAvatar from "../UserAvatar";
import MediaModal from '../../modals/MediaModal';

function VehicleProfile({ vehicleData, openUpdateVehicleProfileModal }) {
  const { authState } = useAuth();
  const [mediaModalOpen, setMediaModalOpen] = useState(false);

  const openMediaModal = () => {
    setMediaModalOpen(true);
  }

  const closeMediaModal = () => {
    setMediaModalOpen(false);
  }

  return (
    <>
      <Card sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, // Adjust layout based on screen size
          width: '100%', 
          height: '100%', 
          marginRight: 3, 
          maxHeight: {md: "240px"}
      }}>
        <Box sx={{ width: { sm: '30%' }, maxWidth: '100%' }}>
          <CardMedia
            component="img"
            height="100%"
            image={`${import.meta.env.VITE_REACT_APP_SERVER_URL}/images/${vehicleData.image}`}
            alt={vehicleData.name}
            onClick={openMediaModal}
            sx={{
              cursor: "pointer",
              width: '100%', // Ensure full width on small screens
              "&:hover": {
                opacity: 0.7,
              },
            }}
          />
        </Box>
        <CardContent sx={{ 
            flex: '1', 
            display: 'flex', 
            flexDirection: 'column', 
        }}>
          <Box sx={{display: "flex", flexDirection: "row"}}>
              <Box sx={{flex: "1"}}>
                  <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                      {vehicleData.name} - {vehicleData.make} {vehicleData.model} ({vehicleData.year})
                  </Typography>
                  <Box sx={{display: "flex", alignItems: "center", flexDirection:"row", flex:"1", marginBottom:2}}> 
                      <UserAvatar userData={vehicleData.User}/>
                      <Typography variant="subtitle1" sx={{ marginLeft: 2 }}>
                          Location: {vehicleData.location}
                      </Typography>
                  </Box>
              </Box>
              {authState.isAuthenticated && authState.user.id === vehicleData.User.id && 
                  <Button 
                      variant='outlined'
                      onClick={openUpdateVehicleProfileModal}
                      sx={{
                          marginLeft: "auto",
                          padding: "3px 10px", 
                          minHeight: "0", 
                          height: "fit-content", 
                      }}
                      size="small"
                  >
                      Edit Vehicle
                  </Button>
              }
          </Box>
          <Typography variant="body2" sx={{ overflow: 'auto', maxHeight: 200, whiteSpace: 'pre-wrap' }}>
            {vehicleData.profile}
          </Typography>
        </CardContent>
      </Card>

      <MediaModal 
        isOpen={mediaModalOpen} 
        onClose={closeMediaModal} 
        imageURL={`${import.meta.env.VITE_REACT_APP_SERVER_URL}/images/${vehicleData.image}`}
        imageTitle={vehicleData.name}
      />
    </>
  );
}

export default VehicleProfile;
