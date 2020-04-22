import moment from 'moment';

class Hotel {
  constructor(rooms, bookings, today) {
    //CAN be called with a specific date, otherwise it will revert to the CURRENT DATE;
    this.rooms = rooms;
    this.bookings = bookings;
    this.today = today || moment().format('YYYY/MM/DD');
    //make SURE to RUN hotel.findAvailableRoomsToday() before accessing the below properties;
    this.totalRooms = null;
    this.availableRoomsQty = null;
    this.todaysBookings = this.findTodaysBookings();
    this.todaysBookingsQty = this.todaysBookings.length;
    //an array of all available rooms objects for a date (not just this.today);
    this.availableRooms = null;
  }

  findTodaysBookings() {
    //returns an array of ALL bookings for TODAY or a specified date;
    return this.bookings.filter(booking => booking.date === this.today);
  }

  //Returns a Quantity ONLY --- SEE Below method to get all available room objects RETURNED
  findAvailableRoomsToday() {
    this.totalRooms = this.rooms.length;
    this.availableRoomsQty = this.totalRooms - this.todaysBookingsQty;
    return `There are ${this.availableRoomsQty} of ${this.totalRooms} total rooms available today.`
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
    if (this.totalRooms === null || this.availableRoomsQty === null) {
      return `The hotel cannot calculated the percentage of rooms without first calculating how many rooms it has & available rooms for the day`;
    } else {
      let percentOccupiedAsDecimal = this.todaysBookingsQty / this.totalRooms;
      let percentOccupied = Math.round(percentOccupiedAsDecimal * 100);
      return `Today we have ${percentOccupied}% of rooms occupied!`
    }
  }

  //RETURNS an array of Room Numbers for the Rooms booked on a given date
  findBookingsByAnyDate(date) {
    let bookingByDateRoomNumbers = [];
    this.bookings.filter(booking => {
      if(booking.date === date && !bookingByDateRoomNumbers.includes(booking.roomNumber)) {
        bookingByDateRoomNumbers.push(booking.roomNumber);
      }
    });
    return bookingByDateRoomNumbers;
  }

  //RETURNS an array of all available Room Objects
  findAvailableRoomsObjects(date) {
    let occupiedRoomsByNumber = this.findBookingsByAnyDate(date);
    if (occupiedRoomsByNumber.length === 0) {
      this.availableRooms = this.rooms;
      return this.rooms;
    } else {
      let allRoomsAvailableToday =
      this.rooms.reduce((allAvailableRooms, currentRoom) => {
        occupiedRoomsByNumber.forEach(roomNumber => {
          if (!occupiedRoomsByNumber.includes(currentRoom.number) && !allAvailableRooms.includes(currentRoom)) {
            allAvailableRooms.push(currentRoom);
          }
        })
        return allAvailableRooms;
      }, []);
      this.availableRooms = allRoomsAvailableToday;
      return allRoomsAvailableToday;
    }
  }

  //RETURNS a single Room Object from the Room Number
  retrieveSpecificRoomObjectUsingRoomNumber(roomNumber) {
    return this.rooms.find(room => room.number === roomNumber);
  }

  //RETURNS an array of Available Rooms fitlered by Type
  //MAKE sure to run hotel.findAvailableRoomsObjects(date) FIRST to update available rooms by specific date
  filterAvailableRoomsByRoomType(roomTypeAsString) {
    return this.availableRooms.filter(availableRoom => availableRoom.roomType === roomTypeAsString);
  }
}


export default Hotel;
