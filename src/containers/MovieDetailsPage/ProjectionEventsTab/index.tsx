'use client';

import { MovieType } from '@/types/MovieType';
import { dateFormatter } from '@/utils/utils';
import { Tab } from '@mui/material';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import MovieTheater from './MovieTheater';
import ProjectionEventList from './ProjectionEventList';
import styles from './ProjectionEventsTab.module.scss';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function ProjectionEventsTab({
  projectionEvents,
}: {
  projectionEvents: MovieType['projectionEventsSortedByDateAndGroupedByTheater'];
}) {
  const now = Date.now();
  const formatter = dateFormatter();
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const datesKeys = Object.keys(projectionEvents);
  const renderedItems: JSX.Element[] = [];
  datesKeys.forEach((date, i) => {
    const moviesTheatersKeys = Object.keys(projectionEvents[date]);
    renderedItems.push(
      <CustomTabPanel value={value} index={i} key={i}>
        {moviesTheatersKeys.map((movieTheaterKey, y) => (
          <div className={styles.MovieTheaterAndProjectionEventsItem} key={y}>
            <MovieTheater movieTheater={projectionEvents[date][movieTheaterKey].movieTheater} />
            <ProjectionEventList
              projectionEvents={projectionEvents[date][movieTheaterKey].projectionEvents}
            />
          </div>
        ))}
      </CustomTabPanel>,
    );
  });

  const renderedTabsKeys = datesKeys;
  const renderedTabs: JSX.Element[] = [];
  renderedTabsKeys.forEach((key, i) => {
    const timestamp = Date.parse(key);
    let label = formatter.format(timestamp);
    if (formatter.format(timestamp) === formatter.format(now)) label = "Aujourd'hui";
    if (formatter.format(timestamp) === formatter.format(now + 1000 * 3600 * 24)) label = 'Demain';
    renderedTabs.push(<Tab value={i} label={label} {...a11yProps(i)} key={i} />);
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Les séances</h2>

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
    </div>
  );
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
