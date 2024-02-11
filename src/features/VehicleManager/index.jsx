import React, { useContext, useEffect, useState } from "react";
import { VehiclesContext } from "../../pages/Vehicles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box"; // Import Box

function VehicleManager() {
  const { vehicles, setVehicles } = useContext(VehiclesContext);
  // State to track expanded profiles
  const [expandedProfiles, setExpandedProfiles] = useState({});

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/vehicles`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("no data from vehicles api");
      })
      .then((vehiclesData) => {
        setVehicles(vehiclesData);
      })
      .catch((error) =>
        console.error("something went wrong getting data for vehicles")
      );
  }, []);

  // Toggle the expanded state for a specific vehicle
  const toggleProfileExpansion = (id) => {
    setExpandedProfiles((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // Determine if the profile text is long enough to need an expansion button
  const isExpandable = (text) => {
    return text && text.length > 100; // Example threshold, adjust as needed
  };

  const VehicleList = () => {
    return (
      <Box sx={{ maxWidth: 1280 }}>
        <Grid container spacing={3}>
          {vehicles.map((vehicle) => (
            <Grid item xs={12} sm={6} md={4} key={vehicle.id}>
              <Card sx={{ maxWidth: 420, m: "auto"}}>
                <CardMedia
                  sx={{ height: 300 }}
                  image={`${import.meta.env.VITE_REACT_APP_SERVER_URL}/images/${
                    vehicle.image
                  }`}
                  title={vehicle.name}
                />
                <CardContent sx={{minHeight: 220}}>
                  <Typography gutterBottom variant="h5" component="div">
                    {vehicle.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {vehicle.make} {vehicle.model} - {vehicle.year}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{
                      maxHeight: expandedProfiles[vehicle.id] ? "none" : 60,
                      minHeight: 80,
                      overflow: "hidden",
                    }}
                  >
                    {vehicle.profile}
                  </Typography>
                  {isExpandable(vehicle.profile) && (
                    <Button
                      size="small"
                      onClick={() => toggleProfileExpansion(vehicle.id)}
                      sx={{marginLeft: -0.5}}
                    >
                      {expandedProfiles[vehicle.id] ? "Show Less" : "Show More"}
                    </Button>
                  )}
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <Box sx={{ paddingTop: 2 }}>
      <VehicleList />
    </Box>
  );
}

export default VehicleManager;
