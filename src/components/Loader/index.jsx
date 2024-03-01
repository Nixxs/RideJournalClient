import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

function Loader() {
    return (
        <Box sx={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%',
            width: "100%",
            marginTop: 2
        }}>
            <CircularProgress />
            <Typography variant="h6" component="div" sx={{ mt: 0, marginLeft: 2 }}>
                Loading...
            </Typography>
        </Box>
    );
}

export default Loader;