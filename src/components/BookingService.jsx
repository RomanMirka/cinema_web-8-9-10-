class BookingService {
  static storageKey = 'bookings'; 

  /**
   * @param {string} movieId ID фільму
   * @param {Array<string>} seats Місця, які потрібно забронювати
   * @param {Object} userData Інформація про користувача
   */
  static saveBooking(movieId, seats, userData) {
    const bookings = this.getAllBookings(); // Отримуємо існуючі бронювання
    bookings[movieId] = bookings[movieId] || []; 

    bookings[movieId].push({ seats, userData });

    localStorage.setItem(this.storageKey, JSON.stringify(bookings));
  }

  /**
   * @param {string} movieId 
   * @returns {Array<string>} 
   */
  static getBookedSeats(movieId) {
    const bookings = this.getAllBookings();
    return bookings[movieId]?.flatMap((booking) => booking.seats) || [];
  }

  /**
   * @returns {Object} 
   */
  static getAllBookings() {
    const data = localStorage.getItem(this.storageKey); 
    return data ? JSON.parse(data) : {}; 
  }

  static clearAllBookings() {
    localStorage.removeItem(this.storageKey); 
  }
}

export default BookingService;
