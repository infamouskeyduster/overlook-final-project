import moment from 'moment';

class Hotel {
  constructor(rooms, bookings, today) {
    //CAN be called with a specific date, otherwise it will revert to the CURRENT DATE;
    this.rooms = rooms;
    this.bookings = bookings;
    this.today = today || moment().format('YYYY/MM/DD');
    //make SURE to RUN hotel.findAvailableRoomsToday() before accessing the below properties;
    this.totalRooms = null;
    this.availableRooms = null;
    // this.addRoomsToBookings(rooms)????? is this necessary?;
    this.todaysBookings = this.findTodaysBookings();
    this.todaysBookingsQty = this.todaysBookings.length;
  }

  findTodaysBookings() {
    //returns an array of ALL bookings for TODAY or a specified date;
    return this.bookings.filter(booking => booking.date === this.today);
  }

  findAvailableRoomsToday() {
    this.totalRooms = this.rooms.length;
    this.availableRooms = this.totalRooms - this.todaysBookingsQty;
    return `There are ${this.availableRooms} of ${this.totalRooms} total rooms available today ${this.today}`
  }

  calculateTotalRevenueToday() {
    let revenue = this.todaysBookings.reduce((totalRevenue, booking) => {
      this.rooms.forEach(room => {
        if (booking.roomNumber === room.number) {
          totalRevenue += room.costPerNight;
        }
      })
      return totalRevenue;
    }, 0)
    let revenueInDollars = revenue.toFixed(2);
    return `The total revenue for ${this.today} is $${revenueInDollars}.`
  }

  calculatePercentageOfRoomsOccupiedToday() {
    if (this.totalRooms === null || this.availableRooms === null) {
      return `The hotel cannot calculated the percentage of rooms without first calculating how many rooms it has & available rooms for the day`;
    } else {
      let percentOccupiedAsDecimal = this.todaysBookingsQty / this.totalRooms;
      let percentOccupied = Math.round(percentOccupiedAsDecimal * 100);
      return `Today we have ${percentOccupied}% of rooms occupied!`
    }
  }
}

export default Hotel;
