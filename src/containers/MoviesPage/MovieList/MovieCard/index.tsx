import { MovieType } from '@/types/MovieType';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// import Image from 'next/image';
import RecommendTwoToneIcon from '@mui/icons-material/RecommendTwoTone';
import Rating from '@mui/material/Rating';
import Tooltip from '@mui/material/Tooltip';
import Link from 'next/link';
import styles from './MovieCard.module.scss';

export default function MovieCard(movie: MovieType) {
  return (
    <Link href={`/movies/${movie.id}`} className={styles.container}>
      <Card sx={{ height: 600 }}>
        <CardMedia
          component="img"
          height="400"
          image={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/images/${movie.coverImageName}`}
          alt={`Affiche de "${movie.title}"`}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <h2 className={styles.movieTitle}>{movie.title}</h2>
            <div className={styles.movieInfos}>
              <Rating value={movie.averageNote} precision={0.5} readOnly />
              {movie.staffFavorite ? (
                <Tooltip title="Coup de coeur de l'équipe">
                  <RecommendTwoToneIcon
                    sx={{
                      width: 40,
                      height: 40,
                      color: 'orange',
                    }}
                    className={styles.favorite}
                  />
                </Tooltip>
              ) : null}
              <span className={styles.minimumAge}>{movie.minimumAge}</span>
            </div>
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {movie.synopsis.slice(0, 140)}...
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', justifyContent: 'center', alignItems: 'center' }}
          ></Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
