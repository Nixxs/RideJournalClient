import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useAuth } from "../../features/AuthManager";

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
            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                {vehicleData.name} 
            </Typography>
            {authState.isAuthenticated && authState.user.id === vehicleData.User.id && 
                <Button 
                    variant='outlined'
                    onClick={openUpdateVehicleProfileModal}
                    sx={{
                        marginLeft: "auto",
                        padding: "3px 10px", // Reduces vertical padding, adjusts horizontal padding
                        minHeight: "0", // Allows the button to be smaller in height
                        height: "fit-content", // Ensures the button height only fits its content
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
