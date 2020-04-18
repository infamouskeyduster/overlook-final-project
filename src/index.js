import $ from 'jquery';
import './css/base.scss';
import CircleType from 'circletype';
import moment from 'moment';
import './images/concierge_desk.jpg';
import './images/budapest_at_night_2.jpg';
import './images/manager.jpg';
import './images/budapest_hotel_only_4.jpg';
import domUpdates from './dom-updates';
import ApiController from './api-controller';
import CustomerRepo from './Customer-repo';

const circleType = new CircleType(document.getElementById('grand-budapest-type'));
circleType.radius(600);

// let today = moment().format('MMM Do YYYY');
let today = moment().format('MM/DD/YYYY');
console.log(today);

let users, rooms, bookings, currentCustomer, currentCustomerID, customerRepo;

const fetchData = () => {
  const apiController = new ApiController();
  Promise.all([apiController.getUsersData(), apiController.getRoomsData(), apiController.getBookingsData()])
    .then(data => {
      console.log('data', data);
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
  console.log(customerRepo);
  // console.log('users global var', users);
  // console.log('rooms global var', rooms);
  // console.log('bookings global var', bookings);
}

//LOGIN HELPER FUNCTION Gets Current User First Name;
const getCurrentUserFirstName = () => {
  return customerRepo.extractCustomerName(currentCustomerID);
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
    // runAppAsCustomer(); BUILD OUT THIS FUNCTION
  }
}

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
    // runAppAsManager(); BUILD OUT THIS Function
  } else if (username.includes('customer') && password === 'overlook2020') {
    checkCustomerNumber(username);
  } else {
    window.alert('Either your username or password is incorrect. Please try again.');
  }
});



// const runAppAsManager = () => {
//
// }
//
// const runAppAsCustomer = () => {
//
// }
