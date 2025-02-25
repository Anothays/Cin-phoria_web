'use client';

import { useState } from 'react';
import AccessibleIcon from '@mui/icons-material/Accessible';
import styles from './Seat.module.scss';

type SeatType = {
  seatId: number;
  isForRedecedMobilityPerson: boolean;
  isNotSelectable: boolean;
  onSeatSelect: (seatId: number) => void;
};

export default function Seat({
  seatId,
  isForRedecedMobilityPerson = false,
  isNotSelectable,
  onSeatSelect,
}: SeatType) {
  const [isSelected, setIsSelected] = useState(false);
  const unselectedColor = '#f44848';
  const unselectedStrokeColor = '#B71C1C';
  const selectedColor = '#13e806';
  const selectedStrokeColor = '#0d8705';
  const wrapperColor = '#757575';
  const notSelectable = '#d9d3d3';

  return (
    <svg
      onClick={() => {
        if (!isNotSelectable) {
          onSeatSelect(seatId);
          setIsSelected((prev) => !prev);
        } else {
          alert("Cette place n'est plus disponible, veuillez-choisir une autre place");
        }
      }}
      className={styles.container}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="32"
      height="32"
    >
      <rect
        x="1"
        y="0"
        width="30"
        height="100%"
        rx="15"
        ry="4"
        fill={isNotSelectable ? notSelectable : isSelected ? selectedColor : unselectedColor}
        stroke={isSelected ? selectedStrokeColor : unselectedStrokeColor}
        strokeWidth="1"
      />

      <rect
        x="0"
        y="20"
        width="32"
        height="14"
        rx="3"
        ry="3"
        fill={isNotSelectable ? notSelectable : isSelected ? selectedColor : unselectedColor}
        stroke={isSelected ? selectedStrokeColor : unselectedStrokeColor}
        strokeWidth="0.5"
      />

      <rect x="0" y="17" width="4" height="14" fill={wrapperColor} />
      <rect x="28" y="17" width="4" height="14" fill={wrapperColor} />

      <rect
        x="0"
        y="28"
        width="32"
        height="5"
        rx="4"
        ry="4"
        fill={wrapperColor}
        stroke={wrapperColor}
        strokeWidth="1"
      />

      {isForRedecedMobilityPerson && <AccessibleIcon />}
    </svg>
  );
}
