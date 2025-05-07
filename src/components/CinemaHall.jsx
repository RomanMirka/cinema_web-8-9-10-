import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CinemaHall() {
  const { id } = useParams(); 
  const rows = 5;
  const cols = 9;

  const storageKey = `selectedSeats_${id}`;

  const [selectedSeats, setSelectedSeats] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  //Зберігаю список вибраних місць у localStorage при зміні selectedSeats
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(selectedSeats));
  }, [selectedSeats]);

  const handleSeatClick = (rowIndex, seatIndex) => {
    const seatId = `R${rowIndex + 1}C${seatIndex + 1}`;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(seat => seat !== seatId));
    } else {
      setSelectedSeats(prev => [...prev, seatId]);
    }
  };

  return (
    <div className="cinema-hall">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="seat-row">
          {Array.from({ length: cols }).map((_, seatIndex) => {
            const seatId = `R${rowIndex + 1}C${seatIndex + 1}`;
            const isSelected = selectedSeats.includes(seatId);

            return (
              <button
                key={seatId}
                className={`seat ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSeatClick(rowIndex, seatIndex)}
              >
                {seatId}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default CinemaHall;
