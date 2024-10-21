import { MovieType } from '@/types/MovieType';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// import Image from 'next/image';
import RecommendTwoToneIcon from '@mui/icons-material/RecommendTwoTone';
import Tooltip from '@mui/material/Tooltip';
import Link from 'next/link';
import Rating from '../../../../components/Rating';
import styles from './MovieCard.module.scss';

export default function MovieCard(movie: MovieType) {
  return (
    <Link href={`/movies/${movie.id}`} className={styles.container}>
      {/* <Image
        className={styles.image}
        // src={movie.img}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/images/${movie.coverImageName}`}
        // alt={movie.name}
        alt={`${movie.coverImageName}`}
        width={290}
        height={300}
        sizes="100%"
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
      <div className={styles.titleAndPriceContainer}>
        <h3 className={styles.text}>{movie.title}</h3>
      </div> */}
      <Card sx={{ height: 600 }}>
        <CardMedia
          component="img"
          height="400"
          image={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/images/${movie.coverImageName}`}
          alt=""
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            {movie.title}
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
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {movie.synopsis.slice(0, 140)}...
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', justifyContent: 'center', alignItems: 'center' }}
          >
            <Rating rate={movie.averageNote} />
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
