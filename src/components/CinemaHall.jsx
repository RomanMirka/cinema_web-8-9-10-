import React, { useState, useEffect } from 'react';
import BookingForm from './BookingForm';
import { useParams } from 'react-router-dom';
import BookingService from './BookingService';

function CinemaHall() {
  const { id } = useParams();
  const rows = 5;
  const cols = 9;

  const storageKey = `selectedSeats_${id}`;
  const [selectedSeats, setSelectedSeats] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [bookedSeats, setBookedSeats] = useState([]); 

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const data = await BookingService.getBookedSeats(id);
        setBookedSeats(data);
      } catch (error) {
        console.error('Помилка при отриманні заброньованих місць:', error);
      }
    };

    fetchBookedSeats();
  }, [id]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(selectedSeats));
  }, [selectedSeats]);

  const handleSeatClick = (rowIndex, seatIndex) => {
    const seatId = `Ряд ${rowIndex + 1} Місце ${seatIndex + 1}`;

    if (bookedSeats.includes(seatId)) {
      alert('Це місце вже заброньоване.');
      return;
    }

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(seat => seat !== seatId)); 
    } else {
      setSelectedSeats(prev => [...prev, seatId]);
    }
  };

  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
      alert('Будь ласка, виберіть хоча б одне місце.');
      return;
    }
    setShowForm(true); 
  };

  const handleFormComplete = () => {
    setSelectedSeats([]); 
    setShowForm(false); 
  };

  return (
    <div className="cinema-hall">
      {!showForm ? (
        <>
          <div className="seat-selection">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div key={rowIndex} className="seat-row">
                {Array.from({ length: cols }).map((_, seatIndex) => {
                  const seatId = `Ряд ${rowIndex + 1} Місце ${seatIndex + 1}`;
                  const isSelected = selectedSeats.includes(seatId);
                  const isBooked = bookedSeats.includes(seatId);

                  return (
                    <button
                      key={seatId}
                      className={`seat ${isSelected ? 'selected' : ''} ${isBooked ? 'selected' : ''}`}
                      onClick={() => handleSeatClick(rowIndex, seatIndex)}
                      disabled={isBooked} // Якщо місце заброньоване, то його не можна вибрати
                    >
                      {seatId}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          <button onClick={handleConfirmBooking} className="confirm-button">
            Забронювати
          </button>
        </>
      ) : (
        <BookingForm
          movieId={id}
          selectedSeats={selectedSeats}
          onComplete={handleFormComplete}
        />
      )}
    </div>
  );
}

export default CinemaHall;
