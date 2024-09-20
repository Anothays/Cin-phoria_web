'use client';

import fetcher from '@/services/fetcher';
import { ApiJSONResponseType } from '@/types/ApiResponseType';
import { MovieTheaterType } from '@/types/MovieTheaterType';
import SearchIcon from '@mui/icons-material/Search';
import { CircularProgress } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import styles from './SearchArea.module.scss';

export default function SearchArea() {
  const [theaters, setTheaters] = useState<readonly MovieTheaterType[]>([]);
  const [isloading, setIsLoading] = useState(true);

  const retriveMoviesTheaters = async () => {
    try {
      const response: ApiJSONResponseType = await fetcher('/api/movie_theaters');
      setTheaters(response['hydra:member'].map((item) => item['theaterName']));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <Autocomplete
        onOpen={retriveMoviesTheaters}
        fullWidth={true}
        disablePortal
        id="combo-box-demo"
        options={theaters}
        renderInput={(params) => <TextField {...params} label="Cinéma" variant={'standard'} />}
        loading={isloading}
        loadingText={<CircularProgress color="inherit" size={20} />}
      />
      <span className={styles.searchButton}>
        <SearchIcon sx={{ fontSize: { sm: 16, lg: 30 } }} />
      </span>
    </div>
  );
}
