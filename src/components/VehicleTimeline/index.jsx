import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { ButtonBase } from '@mui/material';
import Button from '@mui/material/Button';
import { useAuth } from "../../features/AuthManager";

function VehicleTimeline({ vehicleDetails, updateEventCard, openCreateEventModal, selectedEventId,  updateSelectedEventId}) {
  const { authState } = useAuth();

  const handleTimelineItemClick = (eventId) => {
    updateSelectedEventId(eventId);
    updateEventCard(eventId);
  };

  return (
    <Box sx={{ background: "#f0f0f0", padding: 2, borderRadius: "5px" }}>
      <Box sx={{display: "flex", flexDirection: "row"}}>
        <Typography sx={{flex: "1"}} variant="h6" gutterBottom>
            Timeline
        </Typography>
        {authState.isAuthenticated && authState.user.id === vehicleDetails.userId &&
            <Button sx={{
                marginLeft: "auto",
                padding: "3px 10px", 
                minHeight: "0", 
                height: "fit-content",
            }} size="small" variant="outlined" onClick={openCreateEventModal}>
                Create Event
            </Button>
        }
      </Box>

      <Timeline position="alternate">
        {vehicleDetails.Events.sort((a, b) => new Date(b.date) - new Date(a.date)).map((event, index) => (
          <TimelineItem key={event.id}>
            <TimelineSeparator>
              <TimelineDot 
                color="primary" 
                variant={selectedEventId === event.id ? "filled" : "outlined"} />
              {index < vehicleDetails.Events.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <ButtonBase 
                onClick={() => handleTimelineItemClick(event.id)} 
                sx={{ display: 'block', textAlign: 'left' }}
              >
                <Typography variant="subtitle2" component="span" sx={{ fontWeight: 'bold' }}>
                  {event.title}
                </Typography>
                <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                  {event.date}
                </Typography>
              </ButtonBase>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
}

export default VehicleTimeline;
