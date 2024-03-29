import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useAuth } from "../../features/AuthManager";

function UserProfile({ userData, openUpdateUserProfileModal }) {
  const { authState } = useAuth();

  return (
    <Card sx={{ 
      display: 'flex', 
      flexDirection: { xs: 'column', sm: 'row' },
      width: '100%', 
      height: '100%', 
      marginRight: 3, 
      maxHeight: {md: "240px"}
    }}>
      <Box
        sx={{ width: { sm: '30%' }, maxWidth: '100%' }}
      >
        <CardMedia
          component="img"
          height="100%"
          width="30%"
          image={`${import.meta.env.VITE_REACT_APP_SERVER_URL}/images/${userData.image}`}
          alt={userData.name}
        />
      </Box>
      <CardContent sx={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{display: "flex", flexDirection: "row"}}>
            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                {userData.name} 
            </Typography>
            {authState.isAuthenticated && authState.user.id === userData.id && 
                <Button 
                    variant='outlined'
                    onClick={openUpdateUserProfileModal}
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
          {userData.profile}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default UserProfile;
