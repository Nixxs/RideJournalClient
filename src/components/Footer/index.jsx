import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from '@mui/material/Link';
import { FaDiscord } from "react-icons/fa";
import { IconContext } from "react-icons";

function Footer() {
    const theme = useTheme();
    return (
        <Box
            component="footer"
            sx={{
                paddingTop: theme.spacing(2),
                paddingBottom: theme.spacing(1),
                px: 2,
                mt: 'auto',
                backgroundColor: theme.palette.grey[200],
            }}
        >
            <Typography variant="body2" color="textSecondary" align="center" sx={{ fontSize: '0.8em' }}>
                © 2024 Ride Journal. All rights reserved.
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center" sx={{ fontSize: '0.8em' }}>
                <Link href="mailto:nicholas.chai@outlook.com" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</Link> |  
                <NavLink to="/about" style={{ color: 'inherit', textDecoration: 'none' }}> About</NavLink> | 
                <NavLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}> Home</NavLink>
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, fontSize: '0.8em' }}>
                Follow Us On:
                <Link href="https://discord.gg/aq5GWWtM3Y" target="_blank" color="inherit">
                    <IconContext.Provider value={{ size: "2em"}}>
                        <FaDiscord />
                    </IconContext.Provider>
                </Link>
                <Link href="https://Github.com/nixxs" target="_blank" color="inherit"><GitHubIcon /></Link>
            </Typography>
        </Box>
    );
}

export default Footer;