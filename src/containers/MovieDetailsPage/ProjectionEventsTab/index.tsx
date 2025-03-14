'use client';

import { dateFormatter } from '@/utils/utils';
import { CircularProgress, Tab } from '@mui/material';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import MovieTheater from './MovieTheater';
import ProjectionEventList from './ProjectionEventList';
import styles from './ProjectionEventsTab.module.scss';
import { useReservationModalContext } from '@/contexts/ReservationModalContext';

export default function ProjectionEventsTab() {
  const now = Date.now();
  const formatter = dateFormatter();
  const [value, setValue] = useState(0);
  const { movieData } = useReservationModalContext();

  if (movieData.isLoading) return <CircularProgress />;

  if (movieData.data) {
    const movie = movieData.data;
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    /**
     *  Generate all Items of tabs
     */
    const projectionEvents = movie.projectionEventsSortedByDateAndGroupedByTheater;
    const datesKeys = Object.keys(projectionEvents);
    const renderedItems: JSX.Element[] = [];
    datesKeys.forEach((date, i) => {
      const moviesTheatersKeys = Object.keys(projectionEvents[date]);
      renderedItems.push(
        <div
          role="tabpanel"
          hidden={value !== i}
          id={`simple-tabpanel-${i}`}
          key={`simple-tabpanel-${i}`}
          aria-labelledby={`simple-tab-${i}`}
        >
          {value === i && (
            <Box sx={{ p: 3 }}>
              {moviesTheatersKeys.map((movieTheaterKey, y) => (
                <div className={styles.MovieTheaterAndProjectionEventsItem} key={y}>
                  <MovieTheater
                    movieTheater={projectionEvents[date][movieTheaterKey].movieTheater}
                  />
                  <ProjectionEventList
                    projectionEvents={projectionEvents[date][movieTheaterKey].projectionEvents}
                  />
                </div>
              ))}
            </Box>
          )}
        </div>,
      );
    });

    /**
     * Generate Tabs for date selection
     */
    const renderedTabsKeys = datesKeys;
    const renderedTabs: JSX.Element[] = [];
    renderedTabsKeys.forEach((key, i) => {
      const timestamp = Date.parse(key);
      let label = formatter.format(timestamp);
      if (formatter.format(timestamp) === formatter.format(now)) label = "Aujourd'hui";
      if (formatter.format(timestamp) === formatter.format(now + 1000 * 3600 * 24))
        label = 'Demain';
      renderedTabs.push(
        <Tab
          value={i}
          label={label}
          id={`simple-tab-${i}`}
          aria-controls={`simple-tabpanel-${i}`}
          key={i}
        />,
      );
    });

    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Les séances</h2>
        {renderedItems.length === 0 ? (
          <p className="notFoundMessage">Pas de séance prévue pour l&apos;instant</p>
        ) : (
          <Box>
            <Box
              sx={{
                maxWidth: { xs: 320, sm: 640, md: 640, lg: 640 },
                borderBottom: 1,
                borderColor: 'divider',
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="scrollable"
                scrollButtons="auto"
              >
                {renderedTabs}
              </Tabs>
            </Box>
            {renderedItems}
          </Box>
        )}
      </div>
    );
  }
}
