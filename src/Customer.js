import moment from 'moment';

class Customer {
  constructor(id, rooms, bookings, today) {
    this.id = id;
    this.rooms = rooms;
    this.bookings = bookings;
    this.today = today || moment().format('YYYY/MM/DD');
    this.myBookings = this.findMyBookings();
    this.myTotalSpent = this.findMyTotalSpent();
    this.totalSpentDecimal = null;
  }

  findMyBookings() {
    return this.bookings.filter(booking => booking.userID === this.id);
  }

  findMyTotalSpent() {
    let totalSpent =
    this.myBookings.reduce((totalSpent, booking) => {
      this.rooms.forEach(room => {
        if (booking.roomNumber === room.number) {
          totalSpent += room.costPerNight;
        }
      });
      return totalSpent;
    }, 0);
    let totalSpentInDollars = totalSpent.toFixed(2);
    this.totalSpentDecimal = totalSpentInDollars;
    return `You have spent a total of $${totalSpentInDollars} at The Grand Budapest Hotel.`
  }
}

export default Customer;
