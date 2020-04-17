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
    $('#welcome-header').css('padding-top', '0');
    $('#welcome-header').animate({
      right: '1200px',
      top: '80px',
    });
    $('#grand-budapest-type').text(username.charAt(0).toUpperCase() + username.slice(1));
    $('#grand-budapest-type').css('display', 'block');
    $('#grand-budapest-type').css('position', 'absolute');
    $('#grand-budapest-type').css('margin-top', '0');
    $('#grand-budapest-type').animate({
      right: '910px',
      top: '70px',
    });
    $('.header-container').fadeIn(7000, () => {
      $('.header-container').css({
        'background-color': '#66697c',
        'height': '170px',
        'width': '96%',
        'opacity': '.75',
        'margin-top': '3%',
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

  addButtonsToCustomerHeader: () => {
    $('.header-container').append(`
      <section class="customer-button-conatiner">
      <button role="button">Past Bookings</button>
      <button role="button">Future Bookings</button>
      <button role="button">Total Spent on Accomodations</button>
      </section>
      `)
  },

  addButtonsToManagerHeader: () => {
    $('.header-container').append(`
      <section class="manager-button-conatiner">
      <button role="button">Total Rooms Availble Today</button>
      <button role="button">Total Revenue for Today</button>
      <button role="button">Percentage of Rooms Occupied Today</button>
      </section>
      `)
  },
};

export default domUpdates;
