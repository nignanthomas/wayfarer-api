import moment from 'moment';
import UserModel from './userModel';
import TripModel from './tripModel';


/**
*
* @param {object} data
* @returns {object} formatted booking object
*/
const formatBooking = (data) => {
  const formatted = {
    id: data.id,
    bus_license_number: TripModel.getOneTrip(data.trip_id).bus_license_number,
    trip_date: UserModel.getOneUser(data.user_id).trip_date,
    first_name: UserModel.getOneUser(data.user_id).first_name,
    last_name: UserModel.getOneUser(data.user_id).last_name,
    user_email: UserModel.getOneUser(data.user_id).email,
    seat_number: data.seat_number,
  };
  return formatted;
};


class Booking {
  /**
  * class constructor
  * @param data
  */
  constructor() {
    this.bookings = [
      {
        id: 1,
        trip_id: 2,
        user_id: 1,
        seat_number: 12,
        create_on: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
      },
      {
        id: 2,
        trip_id: 1,
        user_id: 2,
        seat_number: 9,
        create_on: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
      },
    ];
  }


  /**
  *
  * @param {object} data
  */
  book(data) {
    const newBooking = {
      id: this.bookings.length + 1,
      trip_id: data.trip_id,
      user_id: data.user_id,
      seat_number: data.seat_number,
      create_on: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
    };
    this.bookings.push(newBooking);
    return newBooking;
  }

  /**
  * @param {uuid} id
  * @returns {object} data
  */
  getOneBooking(id) {
    const oneBooking = this.bookings.find(booking => booking.id === id);
    return formatBooking(oneBooking);
  }

  /**
  *
  * @returns {object} return all bookings
  */
  getAllBookings() {
    const formattedBookings = [];
    this.bookings.forEach((booking) => {
      const formattedBooking = formatBooking(booking);
      formattedBookings.push(formattedBooking);
    });
    return formattedBookings;
  }

  /**
  * @param {uuid} id
  * @param {object} data
  */
  updateBooking(id, data) {
    const booking = this.getOneBooking(id);
    const index = this.bookings.indexOf(booking);
    this.bookings[index] = {
      id: booking.id,
      seat_number: data.seat_number || booking.seat_number,
    };
    return this.bookings[index];
  }

  /**
  *
  * @param {uuid} id
  */
  deleteBooking(id) {
    const booking = this.getOneBooking(id);
    const index = this.bookings.indexOf(booking);
    this.bookings.splice(index, 1);
    return {};
  }
}
export default new Booking();
