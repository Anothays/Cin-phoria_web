import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import styles from './Rating.module.scss';

export default function Rating({ rate }: { rate: number }) {
  const fullStarsCount = Math.floor(rate);
  const emptyStarsCount = rate - fullStarsCount;

  const fullStars = [];
  for (let i = 0; i < fullStarsCount; i++) {
    fullStars.push(<StarTwoToneIcon sx={{ color: 'orange' }} />);
  }
  const emptyStars = [];
  for (let i = 0; i < emptyStarsCount; i++) {
    emptyStars.push(<StarTwoToneIcon sx={{ color: 'orange' }} />);
  }

  return (
    <span className={styles.container}>
      {...fullStars}
      {...emptyStars}
    </span>
  );
}
