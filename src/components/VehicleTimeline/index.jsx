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

function VehicleTimeline({ vehicleEvents, updateEventCard }) {
  const [selectedEventId, setSelectedEventId] = useState(null);

  useEffect(() => {
    if (vehicleEvents.length > 0) {
      const sortedEvents = vehicleEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
      const latestEvent = sortedEvents[0].id;
      setSelectedEventId(latestEvent);
      updateEventCard(latestEvent);
    }
  }, [vehicleEvents]);

  const handleTimelineItemClick = (eventId) => {
    setSelectedEventId(eventId);
    updateEventCard(eventId);
  };

  return (
    <Box sx={{ background: "#f0f0f0", padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Timeline
      </Typography>
      <Timeline position="alternate">
        {vehicleEvents.sort((a, b) => new Date(b.date) - new Date(a.date)).map((event, index) => (
          <TimelineItem key={event.id}>
            <TimelineSeparator>
              <TimelineDot 
                color="primary" 
                variant={selectedEventId === event.id ? "filled" : "outlined"} />
              {index < vehicleEvents.length - 1 && <TimelineConnector />}
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
