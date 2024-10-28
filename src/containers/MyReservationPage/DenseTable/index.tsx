'use client';

import { ReservationType } from '@/types/ReservationType';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import styles from './DenseTable.module.scss';
import RateModal from './RateModal';

const columns = [
  { id: 'movie', label: 'Film' },
  { id: 'date', label: 'Date' },
  { id: 'time', label: 'Heure' },
  { id: 'movie_theater', label: 'Cinéma' },
  { id: 'tickets', label: 'Billets' },
  { id: '', label: '' },
];

export default function DenseTable({ reservations }: { reservations: ReservationType[] }) {
  const [reservationsState, setReservationState] = useState<ReservationType[]>(reservations);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [reservationId, setReserationId] = useState<number | undefined>(undefined);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (reservation: ReservationType) => {
    setReserationId(reservation.id);
    setIsRateModalOpen(true);
  };

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id}>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {reservationsState
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((reservation) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={reservation.id}>
                      <TableCell>{reservation.projectionEvent.movie.title}</TableCell>
                      <TableCell>{reservation.projectionEvent.date}</TableCell>
                      <TableCell>{reservation.projectionEvent.beginAt}</TableCell>
                      <TableCell>{reservation.projectionEvent.movieTheater.theaterName}</TableCell>
                      <TableCell>{reservation.tickets.length}</TableCell>
                      <TableCell>
                        {reservation.rate ? (
                          <p>Avis envoyé</p>
                        ) : (
                          <Button
                            className={styles.button}
                            onClick={() => handleClick(reservation)}
                          >
                            Laisser un avis
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={reservationsState.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <RateModal
        isRateModalOpen={isRateModalOpen}
        closeRateModal={() => setIsRateModalOpen(false)}
        reservationId={reservationId}
        setReservationState={setReservationState}
        reservationsState={reservationsState}
      />
    </>
  );
}
