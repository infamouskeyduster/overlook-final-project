import Hotel from './Hotel';
import domUpdates from './dom-updates';
import ApiController from './api-controller.js'
let apiController = new ApiController();

class Manager {
  constructor(users, bookings, today) {
    this.users = users;
    this.foundCustomersWithSearch = null;
    this.bookings = bookings;
    this.today = today;
  }

  searchCustomerByFirstOrLastName(searchName) {
    let lowerCaseSearchName = searchName.toLowerCase();
    let allFoundCustomers =
    this.users.filter(user => {
      let lowerCaseName = user.name.toLowerCase();
      if (lowerCaseName.includes(lowerCaseSearchName)) {
        return user;
      };
    });
    this.foundCustomersWithSearch = allFoundCustomers;
    this.displayFoundCustomers(this.foundCustomersWithSearch);
    if (this.foundCustomersWithSearch.length === 0) {
      window.alert('We\'re Sorry. Your search did not return any results! Please try again.' );
    }
    return allFoundCustomers;
  }

  displayFoundCustomers() {
    domUpdates.displayFoundCustomersBySearch(this.foundCustomersWithSearch);
  }

  findCustomerBookingsInFuture(currentCustomer) {
    let futureBookings =
    currentCustomer.myBookings.filter(booking => {
      var d1 = Date.parse(this.today);
      var d2 = Date.parse(booking.date);
        if (d1 < d2) return booking;
    })
    this.displayFutureBookingsForCustomer(currentCustomer, futureBookings);
    return futureBookings;
  }

  displayFutureBookingsForCustomer(currentCustomer, futureBookings) {
    domUpdates.displayCustomerBookingInFuture(currentCustomer, futureBookings);
  }

  deleteBookingForCustomer(reservationID, event) {//<-----CANNOT SPY ON THIS; FETCH would need to be mocked out;
    apiController.deleteBookingForCustomer(reservationID);
    domUpdates.deleteBookingFromDOM(event);
  }
}

export default Manager;
