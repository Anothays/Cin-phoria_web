import { ReservationType } from '@/types/ReservationType';
import { CardMedia } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { QRCodeSVG } from 'qrcode.react';
import styles from './TicketCard.module.scss';

type TicketCardProps = {
  reservation: ReservationType;
  uniqueCode: string;
};

export default function TicketCard({ reservation, uniqueCode }: TicketCardProps) {
  const { projectionEvent } = reservation;
  const { movie } = projectionEvent;
  const { movieTheater } = projectionEvent;
  const { projectionRoom } = projectionEvent;

  return (
    <Card sx={{ maxWidth: 500, minWidth: 500 }} className={styles.container}>
      <CardMedia>
        <QRCodeSVG value={uniqueCode} size={256} marginSize={0} title={uniqueCode} />
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {uniqueCode}
        </Typography>
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie.title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Cinéma {movieTheater.theaterName} - Salle {projectionRoom.titleRoom}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {projectionEvent.date} à {projectionEvent.beginAt}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {projectionEvent.language} - {projectionEvent.format.projectionFormatName}
        </Typography>
      </CardContent>
    </Card>
  );
}
