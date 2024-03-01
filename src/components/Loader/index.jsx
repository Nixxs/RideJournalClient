import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function Loader() {
    return (
        <Box sx={{
            marginTop: 2,
        }}>
            <CircularProgress />
        </Box>
    );
}

export default Loader;