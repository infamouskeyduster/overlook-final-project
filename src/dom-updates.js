import $ from 'jquery';
import moment from 'moment';

const domUpdates = {
  loadPage: () => {
  },

  changeHeaderOnLogin: () => {
    $('#welcome-header').text('Welcome:');
    $('#welcome-header').css('color', '#e9747d');
    $('#welcome-header').css('display', 'block');
    $('#welcome-header').css('position', 'absolute');
    $('#welcome-header').css('padding-top', '0');
    $('#welcome-header').animate({
      right: '1200px',
      top: '80px',
    });
    $('#grand-budapest-type').css('display', 'block');
    $('#grand-budapest-type').css('position', 'absolute');
    $('#grand-budapest-type').css('margin-top', '0');
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

  changeGrandBudapestToManager: (username) => {
    $('#grand-budapest-type').text(username.charAt(0).toUpperCase() + username.slice(1));
  },

  changeGrandBudapestToCustomerName: (customerName) => {
    $('#grand-budapest-type').text(customerName);
  },

  animateTypeForManager: () => {
    $('#grand-budapest-type').animate({
      right: '900px',
      top: '60px',
    });
  },

  animateTypeForCustomer: () => {
    $('#grand-budapest-type').animate({
      right: '880px',
      top: '60px',
    });
  },

  changeBodyBackgroundForManager: () => {
    document.body.style.backgroundImage = "url('./images/manager.jpg')";
  },

  changeBodyBackgroundForCustomer: () => {
    document.body.style.backgroundImage = "url('./images/budapest_hotel_only_2.jpg')";
  },

  showDateInHeader: (date) => {
    $('.header-container').prepend(`
      <h3>${date}</h3>
      `)
    },

  addButtonsToCustomerHeader: () => {
    $('.header-container').append(`
      <section class="customer-button-conatiner">
      <button id="all-bookings-btn" role="button">All Bookings</button>
      <button id="total-spent-on-accomodations-btn" role="button">Total Spent on Accomodations</button>
      <button id="customer-book-room-btn" role="button">Book A Room</button>
      </section>
      `)
  },

  addDashboardContianerForCustomer: () => {
    $('.header-container').after(
      `<section class = "dashboard-contianer">
      </section>`
    );
  },

  populateCustomerBookingsInDash: (currentCustomer) => {
    currentCustomer.myBookings.forEach(booking => {
      $('.dashboard-contianer').append(`
        <article class="customer-booking-container">
        <p><span class="customer-booking-category">DATE:</span> ${booking.date}<p>
        <p><span class="customer-booking-category">ROOM NUMBER:</span> ${booking.roomNumber}<p>
        <p><span class="customer-booking-category">ROOM SERVICE CHARGES:</span> ${booking.roomServiceCharges}<p>
        <p><span class="customer-booking-category">CONFIRAMTION ID:</span> ${booking.id}<p>
        </article>
        `);
    });
  },

  populateCustomerSpendingInDash: (currentCustomer) => {
    $('.dashboard-contianer').prepend(`
      <article class="customer-spending"><p>${currentCustomer.myTotalSpent}</p></arcitle>
      `);
  },

  addBookingFeatureForCustomer: (currentCustomer, hotel) => {
    //date selector
    //pull-down with available rooms
    //^^^when a room is selected, it should show room details
    //ERROR handling 'we are sorry there are NO rooms'

    //then post the room to database---->
  },

  addButtonsToManagerHeader: () => {
    $('.header-container').append(`
      <section class="manager-button-conatiner">
      <button id="total-rooms-availble-today-btn" role="button">Total Rooms Availble Today</button>
      <button id="total-revenue-for-today-btn" role="button">Total Revenue for Today</button>
      <button id="percentage-of-rooms-occupied-today-btn" role="button">Percentage of Rooms Occupied Today</button>
      </section>
      `)

  },

  addDashboardContianerForManager: () => {
    console.log('hola');
    $('.header-container').after(
      `<section class = "dashboard-contianer">
      </section>`
    );
  },

  addTotalRoomsAvailableToday: (hotel) => {
    $('.dashboard-contianer').append(`
      <article class="hotel-info-total-rooms-dash">
      <p>${hotel.findAvailableRoomsToday()}</p>
      </article>
      `);
  },

  addTotalRevenueForToday: (hotel) => {
    $('.dashboard-contianer').append(`
      <article class="hotel-info-revenue-dash">
      <p>${hotel.calculateTotalRevenueToday()}</p>
      </article>
      `);
  },

  addPercentageOfRoomsOccupiedToday: (hotel) => {
    $('.dashboard-contianer').append(`
      <article class="hotel-info-precentage-occupied-dash">
      <p>${hotel.calculatePercentageOfRoomsOccupiedToday()}</p>
      </article>
      `);
  },
};

export default domUpdates;
