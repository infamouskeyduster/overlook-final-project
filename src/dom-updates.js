import $ from 'jquery';
import moment from 'moment';

const domUpdates = {
  loadPage: () => {

  },

  changeHeaderOnLogin: (username) => {
    $('#welcome-header').text('Welcome:');
    $('#welcome-header').css('color', '#e9747d');
    $('#welcome-header').css('display', 'block');
    $('#welcome-header').css('position', 'absolute');
    $('#welcome-header').animate({
      right: '1200px',
      top: '70px',
    });
    $('#grand-budapest-type').text(username.charAt(0).toUpperCase() + username.slice(1));
    $('#grand-budapest-type').css('display', 'block');
    $('#grand-budapest-type').css('position', 'absolute');
    $('#grand-budapest-type').animate({
      right: '920px',
      top: '60px',
    });
    $('.header-container').fadeIn(7000, () => {
      $('.header-container').css({
        'background-color': '#66697c',
        'height': '125px',
        'width': '96%',
        'opacity': '.65',
        'margin-top': '2%',
      });
    });
    $('.login-form-box').hide();
  },

  changeBodyBackgroundForManager: () => {
    document.body.style.backgroundImage = "url('./images/manager.jpg')";
  },

  changeBodyBackgroundForCustomer: () => {
    document.body.style.backgroundImage = "url('./images/budapest_hotel_only_4.jpg')";
  },
};

export default domUpdates;
