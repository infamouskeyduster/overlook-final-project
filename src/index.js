import $ from 'jquery';
import './css/base.scss';
import CircleType from 'circletype';
import moment from 'moment';
import './images/concierge_desk.jpg';
import './images/budapest_at_night_2.jpg';
import './images/manager.jpg';
import './images/budapest_hotel_only_2.jpg';
import domUpdates from './dom-updates';
import ApiController from './api-controller';
import CustomerRepo from './Customer-repo';
import Customer from './Customer';
import Hotel from './Hotel';

const circleType = new CircleType(document.getElementById('grand-budapest-type'));
circleType.radius(600);

let today = moment().format('MMM Do, YYYY');
// let today = moment().format('MM/DD/YYYY');

//REMEMBER THAT we have 2 different format veraions of TODAY - one for display,
//the other for instantiating Hotel, Customer classes (same date format as Data);

let users, rooms, bookings, hotel, currentCustomer, currentCustomerID, customerRepo, currentCustomerFirstName;

const fetchData = () => {
  const apiController = new ApiController();
  Promise.all([apiController.getUsersData(), apiController.getRoomsData(), apiController.getBookingsData()])
    .then(data => {
      // console.log('data', data);
      let usersData = data[0];
      let roomsData = data[1];
      let bookingsData = data[2];
      fetchedData(usersData, roomsData, bookingsData);
    })
    // .catch(error => console.log(`There was an error obtaining all data ${error}`))
}

fetchData();

const fetchedData = (usersData, roomsData, bookingsData) => {
  // users = usersData.map(user => new User(user)); //HOW TO INSTANTIATE WITH global var DATA
  users = usersData.users;
  rooms = roomsData.rooms;
  bookings = bookingsData.bookings
  customerRepo = new CustomerRepo(users);
  // console.log(customerRepo);
  // console.log('users global var', users);
  // console.log('rooms global var', rooms);
  // console.log('bookings global var', bookings.length);
}

//LOGIN HELPER FUNCTION Gets Current User First Name;
const getCurrentUserFirstName = () => {
  let currentCustomerFullName = customerRepo.extractCustomerName(currentCustomerID);
  currentCustomerFirstName = currentCustomerFullName.split(' ')[0];
  return currentCustomerFirstName;
}
//LOGIN Helper Function that sesses and splits customer Number
const checkCustomerNumber = (customer) => {
  let customerSplitAtNumber = customer.split('r');
  currentCustomerID = parseInt(customerSplitAtNumber[1]);
  console.log(currentCustomerID);
  if (currentCustomerID > 50) {
    window.alert('Your customer number is invalid. Makes sure that your customer number is between 1 & 50.');
  } else {
    console.log('you are logged in as a customer');
    domUpdates.changeBodyBackgroundForCustomer();
    domUpdates.changeHeaderOnLogin();
    domUpdates.changeGrandBudapestToCustomerName(getCurrentUserFirstName());
    domUpdates.animateTypeForCustomer();
    domUpdates.addButtonsToCustomerHeader();
    domUpdates.showDateInHeader(today);
    runAppAsCustomer();
  }
}

//illuminate Submit Button on Login form
$('.password-input').keyup(() => {
  if ($('.username-input').val() != 0 && $('.password-input').val() != 0) {
    $('.login-submit-btn').addClass('button-clicked');
  } else {
    $('.login-submit-btn').removeClass('button-clicked');
  }
});

//MAIN LOGIN Function
$('.login-submit-btn').on('click', () => {
  let username = $('.username-input').val();
  let password = $('.password-input').val();
  if (username === 'manager' && password === 'overlook2020') {
    console.log('you are logged in as the manager');
    domUpdates.changeBodyBackgroundForManager();
    domUpdates.changeHeaderOnLogin();
    domUpdates.changeGrandBudapestToManager(username);
    domUpdates.animateTypeForManager();
    domUpdates.addButtonsToManagerHeader();
    domUpdates.showDateInHeader(today);
    runAppAsManager();
  } else if (username.includes('customer') && password === 'overlook2020') {
    checkCustomerNumber(username);
  } else {
    window.alert('Either your username or password is incorrect. Please try again.');
  }
});

const runAppAsManager = () => {
  today = moment().format('YYYY/MM/DD');
  hotel = new Hotel(rooms, bookings, today);
  hotel.findAvailableRoomsToday();
  domUpdates.addDashboardContianerForManager();
  console.log('hotel obj', hotel);
}

const runAppAsCustomer = () => {
  today = moment().format('YYYY/MM/DD');
  currentCustomer = new Customer(currentCustomerID, rooms, bookings, today);
  domUpdates.addDashboardContianerForCustomer();
  // console.log('customer obj', currentCustomer);
}

const globalEventHandler = (event) => {
  if (event.target.id === 'all-bookings-btn') {
    $('#customer-book-room-btn').removeClass('button-clicked');
    //Remove booking modal from DOM here………
    if (event.target.classList.contains('button-clicked')) {
      event.target.classList.remove('button-clicked');
      $('.customer-booking-container').remove();
    } else {
      event.target.classList.add('button-clicked');
      domUpdates.populateCustomerBookingsInDash(currentCustomer);
    }
  } else if (event.target.id === 'total-spent-on-accomodations-btn') {
    $('#customer-book-room-btn').removeClass('button-clicked');
    //Remove booking modal from DOM here………
    if (event.target.classList.contains('button-clicked')) {
      event.target.classList.remove('button-clicked');
      $('.customer-spending').remove();
    } else {
      event.target.classList.add('button-clicked');
      domUpdates.populateCustomerSpendingInDash(currentCustomer);
    }
  } else if(event.target.id === 'total-rooms-availble-today-btn') {
    if (event.target.classList.contains('button-clicked')) {
      event.target.classList.remove('button-clicked');
      $('.hotel-info-total-rooms-dash').remove();
    } else {
      console.log('total rooms btn clicked');
      event.target.classList.add('button-clicked');
      domUpdates.addTotalRoomsAvailableToday(hotel);
    }
  } else if(event.target.id === 'total-revenue-for-today-btn') {
    if (event.target.classList.contains('button-clicked')) {
      event.target.classList.remove('button-clicked');
      $('.hotel-info-revenue-dash').remove();
    } else {
      $('#all-bookings-btn').removeClass('button-clicked');
      event.target.classList.add('button-clicked');
      domUpdates.addTotalRevenueForToday(hotel);
    }
  } else if(event.target.id === 'percentage-of-rooms-occupied-today-btn') {
    if(event.target.classList.contains('button-clicked')) {
      event.target.classList.remove('button-clicked');
      $('.hotel-info-precentage-occupied-dash').remove();
    } else {
      event.target.classList.add('button-clicked');
      domUpdates.addPercentageOfRoomsOccupiedToday(hotel);
    }
  } else if(event.target.id === 'customer-book-room-btn') {
    $('#all-bookings-btn').removeClass('button-clicked');
    $('.customer-booking-container').remove();
    $('#total-spent-on-accomodations-btn').removeClass('button-clicked');
    $('.customer-spending').remove();
    event.target.classList.add('button-clicked');
    domUpdates.addBookingFeatureForCustomer(currentCustomer, hotel);
  }
}

$('body').click(globalEventHandler);
