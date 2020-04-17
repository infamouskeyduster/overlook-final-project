import $ from 'jquery';
import './css/base.scss';
import CircleType from 'circletype';
import './images/concierge_desk.jpg';
import './images/budapest_at_night_2.jpg';
import './images/manager.jpg';
import './images/budapest_hotel_only_4.jpg';
import domUpdates from './dom-updates';

const circleType = new CircleType(document.getElementById('grand-budapest-type'));
circleType.radius(600);

// import './images/turing-logo.png';
let loginUsers = [
  {

  },
  {

  },
];

//LOGIN Function
$('.login-submit-btn').on('click', () => {
  let username = $('.username-input').val();
  let password = $('.password-input').val();
  if (username === 'manager' && password === 'overlook2020') {
    console.log('you are logged in as the manager');
    domUpdates.changeHeaderOnLogin(username);
    domUpdates.changeBodyBackgroundForManager();
  } else if (username.includes('customer') && password === 'overlook2020') {
    console.log('you are logged in as a customer');
    domUpdates.changeHeaderOnLogin(username);
    domUpdates.changeBodyBackgroundForCustomer();
  } else {
    window.alert('Either your username or password is incorrect. Please try again.');
  }
});


//promise all here
