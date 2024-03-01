import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function Loader() {
    console.log("loader is loading");
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
        </Box>
    );
}

export default Loader;