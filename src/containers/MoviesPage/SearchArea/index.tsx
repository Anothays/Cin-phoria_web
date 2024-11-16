'use client';

import { ApiJSONResponseType } from '@/types/ApiResponseType';
import { MovieCategory } from '@/types/MovieCategory';
import { MovieTheaterType } from '@/types/MovieTheaterType';
import { CircularProgress } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from 'react';
import styles from './SearchArea.module.scss';

type SearchAreaProps = {
  callbackAction: (query: string) => void;
};

export default function SearchArea({ callbackAction }: SearchAreaProps) {
  const [theaters, setTheaters] = useState<readonly string[]>([]);
  const [categories, setCategories] = useState<readonly string[]>([]);
  const [isloading, setIsLoading] = useState(true);
  // const [queryParams, setQueryParams] = useState<URLSearchParams>(new URLSearchParams('?'));

  const [url, setUrl] = useState(new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`));

  // const [choosenTheaterName, setChoosenTheaterName] = useState('');
  // const [choosenCategory, setChoosenCategory] = useState('');
  // const [choosenDate, setChoosenDate] = useState('');

  const retrieveMovieTheaters = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movie_theaters`);
      const data: ApiJSONResponseType<MovieTheaterType> = await response.json();
      const theaters = data['hydra:member'];
      setTheaters(theaters.map((item) => item['theaterName']));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveMovieCategories = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movie_categories`);
      const data: ApiJSONResponseType<MovieCategory> = await response.json();
      const movieCategories = data['hydra:member'];
      setCategories(movieCategories.map((item) => item['categoryName']));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (query: string, value: string) => {
    setUrl((prev) => {
      const newState = new URL(prev.toString());
      if (!value) {
        newState.searchParams.delete(query);
      } else {
        newState.searchParams.set(query, value);
      }
      return newState;
    });
  };

  useEffect(() => {
    callbackAction(url.pathname + url.search);
  }, [url]);

  return (
    <div className={styles.container}>
      <form className={styles.inputSection}>
        <Autocomplete
          // value={choosenTheaterName}
          onChange={(event, value) =>
            handleChange('projectionEvents.projectionRoom.movieTheater.theaterName', value ?? '')
          }
          onOpen={retrieveMovieTheaters}
          fullWidth={true}
          disablePortal
          id="combo-box-demo"
          options={theaters}
          renderInput={(params) => (
            <TextField {...params} label="Rechercher un cinéma" variant={'standard'} />
          )}
          loading={isloading}
          loadingText={<CircularProgress color="inherit" size={20} />}
        />
        <Autocomplete
          // value={choosenCategory}
          onChange={(event, value) => handleChange('movieCategories.categoryName', value ?? '')}
          onOpen={retrieveMovieCategories}
          fullWidth={true}
          disablePortal
          id="combo-box-demo"
          options={categories}
          renderInput={(params) => <TextField {...params} label="Genre" variant={'standard'} />}
          loading={isloading}
          loadingText={<CircularProgress color="inherit" size={20} />}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            // value={choosenDate}
            onChange={(event) =>
              handleChange('projectionEvents.beginAt', event!.format('YYYY-MM-DD'))
            }
            className={styles.datePicker}
            sx={{ width: { xs: 200, sm: 200, md: 400, lg: 400 } }}
            format="YYYY-MM-DD"
            label="Date"
          />
        </LocalizationProvider>

        {/* <button className={styles.searchButton}>
          <SearchIcon sx={{ fontSize: { sm: 16, lg: 30 } }} />
        </button> */}
      </form>
    </div>
  );
}
