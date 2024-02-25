import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useAuth } from "../../features/AuthManager";
import UserAvatar from "../UserAvatar";

function VehicleProfile({ vehicleData, openUpdateVehicleProfileModal }) {
  const { authState } = useAuth();

  return (
    <Card sx={{ display: 'flex', width: '100%', height: '100%', marginRight: 3, maxHeight: "240px"}}>
      <Box
        sx={{
          width: '30%',
          objectFit: 'contain', // This ensures the image covers the area without stretching
        }}
      >
        <CardMedia
          component="img"
          height="100%"
          width="30%"
          image={`${import.meta.env.VITE_REACT_APP_SERVER_URL}/images/${vehicleData.image}`}
          alt={vehicleData.name}
        />
      </Box>
      <CardContent sx={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
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
                    Edit Profile
                </Button>
            }
        </Box>
        <Typography variant="body2" sx={{ overflow: 'auto', maxHeight: 200, whiteSpace: 'pre-wrap' }}>
          {vehicleData.profile}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default VehicleProfile;
