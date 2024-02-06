import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import TwitterIcon from '@mui/icons-material/Twitter';
import YoutubeIcon from '@mui/icons-material/Youtube';
import GithubIcon from '@mui/icons-material/Github';
import Link from '@mui/material/Link';

function Footer() {
    const theme = useTheme();
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: theme.palette.grey[200],
            }}
        >
            <Typography variant="body2" color="textSecondary" align="center">
                © 2024 Ride Journal. All rights reserved.
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
                <NavLink to="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</NavLink> |  
                <NavLink to="/about" style={{ color: 'inherit', textDecoration: 'none' }}> About</NavLink> | 
                <NavLink to="/home" style={{ color: 'inherit', textDecoration: 'none' }}> Home</NavLink>
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                Follow Us On:
                <Link href="https://twitter.com" color="inherit"><TwitterIcon /></Link>
                <Link href="https://youtube.com" color="inherit"><YoutubeIcon /></Link>
                <Link href="https://Github.com" color="inherit"><GithubIcon /></Link>
            </Typography>
        </Box>
    );
}

export default Footer;
