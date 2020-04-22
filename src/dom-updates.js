import $ from 'jquery';
import moment from 'moment';

let today = moment().format('YYYY-MM-DD');

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
      top: '-37px',
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
      top: '50px',
    });
  },

  animateTypeForCustomer: () => {
    $('#grand-budapest-type').animate({
      right: '865px',
      top: '50px',
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

  //BOOKING feature for customer
  addBookingFeatureForCustomer: (currentCustomer, hotel) => {
    $('.dashboard-contianer').css({'justify-content': 'center'});
    $('.dashboard-contianer').prepend(`
      <section class="customer-booking-modal">
        <label for="date-to-stay">What day are you looking to stay?</label>
          <input type="date" id="date-to-stay" name="date-to-stay" value="${today}" min="${today}" max="2020-12-31">
       </section>
      `);

      $('#date-to-stay').on('change', () => {
        $('.room-type-pull-down-container').remove();
        $('.room-number-pull-down-container').remove();
        $('.room-info-container').remove();
        $('.customer-booking-modal').append(`
           <article class="room-type-pull-down-container">
             <label for="select-room-by-type">Please choose a <i>Room Type</i> to view available rooms:</label>
               <select id="select-room-by-type">
                 <option value="null"></option>
                 <option value="single room">Single Room</option>
                 <option value="suite">Suite</option>
                 <option value="junior suite">Junior Suite</option>
                 <option value="residential suite">Residential Suite</option>
               </select>
           </article>
           `);

      $('#select-room-by-type').on('change', () => {
        $('.room-number-pull-down-container').remove();
        $('.room-info-container').remove();
        $('.customer-booking-modal').append(`
          <article class="room-number-pull-down-container">
          <label for="select-room-by-number">Please choose an AVAILABLE room to view details:</label>
          <select id="select-room-by-number">
          </select>
          </article>
          `);
          domUpdates.addAvailableRoomNumbersToDropDown(hotel, $('#date-to-stay').val(), $('#select-room-by-type').val())
      });
    });
  },

  addAvailableRoomNumbersToDropDown: (hotel, date, roomType) => {
    let unformattedDate = date;
    let formattedDate = moment(unformattedDate).format('YYYY/MM/DD');
    hotel.findAvailableRoomsObjects(formattedDate);
    let availableRoomByType = hotel.filterAvailableRoomsByRoomType(roomType);
    if(availableRoomByType.length > 0) {
      $('#select-room-by-number').append(`<option value="null"></option>`);
      return availableRoomByType.forEach(room => {
        $('#select-room-by-number').append(`<option value="${room.number}">Room Number: ${room.number}</option>`)
      });
    } else {
      window.alert('The Concierge M. Gustave is terribly saddened, and deeply apologetic…we have no rooms of this type available on this day. Please choose a different type of room to proceed')
    }
  },

  retriveAndShowCustomerRoomInfo: (hotel) => {
    $('.room-info-container').remove();
    let roomNumber = parseInt($('#select-room-by-number').val());
    let foundRoom = hotel.retrieveSpecificRoomObjectUsingRoomNumber(roomNumber);
    $('.customer-booking-modal').append(`
      <article class="room-info-container">
      <p>Information for your room choice:</p>
      <ul>
        <li><b>Bed Size:</b> ${foundRoom.bedSize.toUpperCase()}</li>
        <li><b>Bidet in suite:</b> ${foundRoom.bidet}</li>
        <li><b>Cost of Room Per Night:</b> $${foundRoom.costPerNight}USD</li>
        <li><b>Number of Beds:</b> ${foundRoom.numBeds}</li>
        <li><b>Room Type:</b> ${foundRoom.roomType.toUpperCase()}</li>
      </ul>
      <button id="book-room-now-btn">BOOK ROOM NOW!</button>
      `)
  },

  showBookingConfirmationMessage: (bookingPostObj) => {
  let unformattedDate = bookingPostObj.date;
  let formattedDate = moment(unformattedDate).format('MMM Do, YYYY');
  $('.customer-booking-modal').empty();
  $('.customer-booking-modal').append(`
    <section id="booking-confirmation-container">
      <article>
        <h4 style="text-align : center; border-bottom: 2.75px solid #e9747d;"><b>YOUR BOOKING WAS SUCCESSFUL!</b></h4>
        <h4 style="text-align : center; color: #f5f3f4;">we will see you on ${formattedDate}!</h4>
        <h4 style="text-align : center; color: #f5f3f4;">you are confirmed, and will be  staying with us in room number ${bookingPostObj.roomNumber}.</h4>
      </article>
    </section>
    `);
  },
  //END ———————— BOOKING feature for customer

  addButtonsToManagerHeader: () => {
    $('.header-container').append(`
      <section class="manager-button-conatiner">
      <button id="total-rooms-available-today-btn" role="button">Total Rooms Available Today</button>
      <button id="total-revenue-for-today-btn" role="button">Total Revenue for Today</button>
      <button id="percentage-of-rooms-occupied-today-btn" role="button">Percentage of Rooms Occupied Today</button>
      <section id="manager-search-container">
      <label for="site-search">Search for Guests :</label>
      <input type="search" id="search-for-guests" name="search all guests" aria-label="Search for Guests">
      <button id="search-customers-btn">Search</button>
      </section>
      </section>
      `)
  },

  addDashboardContianerForManager: () => {
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

  displayFoundCustomersBySearch: (foundCustomersFromSearch) => {
    $('.dashboard-contianer').empty();
    foundCustomersFromSearch.forEach(customer => {
      $('.dashboard-contianer').append(`
        <article class="found-customers" id="${customer.id}">
        <p>Customer:<br><b>${customer.name.toUpperCase()}</b></p>
        <p style="color: #954A50;">Customer ID:<br>${customer.id}</p>
        <button class="show-customer-total-spent-btn" style="margin-top: 25px;">show customer spending</button>
        <button class="view-customer-history-btn" style="margin-top: 10px;">view customer history</button>
        <button class="book-customer-room-btn" style="margin-top: 10px;">book customer a room</button>
        <button class="delete-customer-booking-btn" style="margin-top: 10px;">Delete future booking</button>
        </article>
        `);
    });
  },

  displayCustomerBookingInFuture: (currentCustomer, futureBookings) => {
    $('.dashboard-contianer').empty();
    futureBookings.forEach(booking => {
      $('.dashboard-contianer').append(`
        <article class="found-customers" id="${booking.id}">
        <p style="font-size: 1.1rem;">BOOKING DATE:<br><b>${booking.date}</b></p>
        <hr>
        <p style="font-size: 1.1rem; color: #954A50;">ROOM NUMBER:<br><b>${booking.roomNumber}</b></p>
        <hr>
        <p style="font-size: 0.95rem;">Confirmation Number:<br><b>${booking.id}</b></p>
        <button class="delete-booking" style="margin-top: 25px;">delete booking</button>
        `);
    });
  },

  deleteBookingFromDOM: (event) => {
    event.target.closest('article').remove();
  },

  showTotalCustomerHasSpent: (event, currentCustomer) => {
    currentCustomer.findMyTotalSpent();
    event.target.closest('article').insertAdjacentHTML('afterbegin', `<p style="font-size: 0.95rem; line-height: 1.2rem;">This customer has spent a total of $${currentCustomer.totalSpentDecimal}.</p>`)
  },
};

export default domUpdates;
