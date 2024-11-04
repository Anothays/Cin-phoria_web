'use client';

import { ProjectionEventType } from '@/types/ProjectionEventType';
import { dateFormatter } from '@/utils/utils';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
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
  projectionEvents: ProjectionEventType[];
}) {
  const movieTheaters = projectionEvents
    .map((projectionEvent) => projectionEvent.movieTheater)
    .filter(
      (theater, index, self) =>
        index ===
        self.findIndex((t) => t['@id'] === theater['@id'] && t.theaterName === theater.theaterName),
    );
  const now = Date.now();
  const projectionEventsOrderedByDate: { [key: string]: ProjectionEventType[] } = {};
  projectionEvents.forEach((projectionEvent) => {
    projectionEventsOrderedByDate[projectionEvent.date] = projectionEvents.filter(
      (item) => item.date === projectionEvent.date,
    );
  });

  const days = Object.keys(projectionEventsOrderedByDate).sort((a, b) => {
    const dateA = new Date(a.split('/').reverse().join('-'));
    const dateB = new Date(b.split('/').reverse().join('-'));
    return dateA - dateB;
  }); // Retrier pour avoir un tableau de datestring dans l'ordre chronologique
  const formatter = dateFormatter();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const projectionEventsOrderedByMovieTheater: { [key: string]: ProjectionEventType[] } = {};
  movieTheaters.forEach((movieTheater) => {
    projectionEventsOrderedByMovieTheater[movieTheater['@id']] = projectionEvents.filter(
      (projectionEvent) => projectionEvent.movieTheater['@id'] === movieTheater['@id'],
    );
  });

  const renderedItems = [];
  for (let i = 0; i < days.length; i++) {
    renderedItems.push(
      <CustomTabPanel value={value} index={i} key={i}>
        {movieTheaters.map((movieTheater) => (
          <div className={styles.MovieTheaterAndProjectionEventsItem} key={movieTheater['@id']}>
            <MovieTheater {...movieTheater} />
            <ProjectionEventList
              {...projectionEventsOrderedByMovieTheater[movieTheater['@id']].filter(
                (item) => item.date === days[i],
              )}
            />
          </div>
        ))}
      </CustomTabPanel>,
    );
  }

  const renderedTabs = [];
  for (let i = 0; i < days.length; i++) {
    if (i === 0) {
      renderedTabs.push(<Tab value={i} label="Aujourd'hui" {...a11yProps(i)} key={i} />);
    } else if (i === 1) {
      renderedTabs.push(<Tab value={i} label="Demain" {...a11yProps(i)} key={i} />);
    } else {
      renderedTabs.push(
        <Tab
          value={i}
          label={formatter.format(now + 1000 * 3600 * 24 * i)}
          {...a11yProps(i)}
          key={i}
        />,
      );
    }
  }

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
