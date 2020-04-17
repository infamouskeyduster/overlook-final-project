import $ from 'jquery';
import './css/base.scss';
import CircleType from 'circletype';
import './images/concierge_desk.jpg';
import './images/budapest_at_night_2.jpg';
import './images/manager.jpg';
import './images/budapest_hotel_only_4.jpg';

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
    changeHeaderOnLogin(username);
    document.body.style.backgroundImage = "url('./images/manager.jpg')";
  } else if (username.includes('customer') && password === 'overlook2020') {
    console.log('you are logged in as a customer');
    changeHeaderOnLogin(username);
    document.body.style.backgroundImage = "url('./images/budapest_hotel_only_4.jpg')";
  } else {
    window.alert('Either your username or password is incorrect. Please try again.');
  }
});

function changeHeaderOnLogin(username) {
  $('#welcome-header').text('Welcome:');
  $('#welcome-header').css('color', '#cc9554');
  $('#grand-budapest-type').text(username.charAt(0).toUpperCase() + username.slice(1));
  $('.login-form-box').hide();
}
