import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function VehicleList({vehicles}) {
    const [expandedProfiles, setExpandedProfiles] = useState({});

    // Toggle the expanded state for a specific vehicle
    const toggleProfileExpansion = (id) => {
        setExpandedProfiles((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
        }));
    };

    // Determine if the profile text is long enough to need an expansion button
    const isExpandable = (text) => {
        return text && text.length > 200; // Example threshold, adjust as needed
    };

    return (
      <Box sx={{ maxWidth: 1280 }}>
        <Grid container spacing={3}>
          {vehicles.map((vehicle) => (
            <Grid item xs={12} sm={6} md={4} key={vehicle.id}>
              <Card sx={{ maxWidth: "50vw", m: "auto", }}>
                <CardMedia
                  sx={{ height: 300 }}
                  image={`${import.meta.env.VITE_REACT_APP_SERVER_URL}/images/${
                    vehicle.image
                  }`}
                  title={vehicle.name}
                />
                <CardContent sx={{ minHeight: 190, minWidth: 300 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {vehicle.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  {vehicle.year} {vehicle.make} {vehicle.model} - {vehicle.location}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{
                      maxHeight: expandedProfiles[vehicle.id] ? "none" : 10,
                      minHeight: isExpandable(vehicle.profile) ? 80: 110,
                      overflow: "hidden",
                      marginTop: 1
                    }}
                  >
                    {vehicle.profile}
                  </Typography>
                  {isExpandable(vehicle.profile) && (
                    <Button
                      size="small"
                      onClick={() => toggleProfileExpansion(vehicle.id)}
                      sx={{ marginLeft: -0.5 }}
                    >
                      {expandedProfiles[vehicle.id] ? "Show Less" : "Show More"}
                    </Button>
                  )}
                </CardContent>
                <CardActions>
                  <NavLink to={`/vehicles/${vehicle.id}`}>
                    <Button sx={{marginLeft: 1, marginTop: -2}} size="small" variant="outlined">View Timeline</Button>
                  </NavLink>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
};

export default VehicleList;

