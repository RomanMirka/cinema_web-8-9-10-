import React, { useState } from 'react';
import BookingService from './BookingService'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingForm = ({ movieId, selectedSeats, onComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, phone, email } = formData;

    if (!name || !phone || !email) {
      toast.error('Будь ласка, заповніть усі поля.', {
        position: 'top-center',
      });
      return;
    }

    // Перевірка формату Email
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Будь ласка, введіть дійсний Email.', {
        position: 'top-center', 
      });
      return;
    }

    try {
      await BookingService.saveBooking(movieId, selectedSeats, formData);
      toast.success('Бронювання успішно збережено!', {
        position: 'top-center', 
      });
      onComplete(); 
    } catch (error) {
      toast.error('Помилка збереження бронювання. Спробуйте пізніше.', {
        position: 'top-center', 
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <h3 className='form_labels_h'>Підтвердження бронювання</h3>
      <div>
        <label className='form_labels'>Ім'я:</label>
        <input
          className='form_inputs'
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className='form_labels'>Телефон:</label>
        <input
          className='form_inputs'
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className='form_labels'>Email:</label>
        <input
          className='form_inputs'
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <button className='confirm-button' type="submit">Підтвердити</button>
    </form>
  );
};

export default BookingForm;
