import domUpdates from './dom-updates';

class ApiController {
  constructor() {
  }

  getUsersData() {
    let url = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users';
    return fetch(url)
      .then(response => response.json())
  }

  getRoomsData() {
    let url = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms';
    return fetch(url)
      .then(response => response.json())
  }

  getBookingsData() {
    let url = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings';
    return fetch(url)
      .then(response => response.json())
  }

  postBookingForCustomer(id, date, roomNumber) { //<---- spy on this method
    let bookingPostObj = {
      'userID': Number(id),
      'date': date,
      'roomNumber': Number(roomNumber),
    };
      //delete this line below and comment back in the rest when DONE
      domUpdates.showBookingConfirmationMessage(bookingPostObj);
    // let url = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings';
    // return fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-type': 'application/json'
    //   },
    //   body: JSON.stringify(bookingPostObj)
    // })
    // .then(response => console.log(response.json()))
    // .then(domUpdates.showBookingConfirmationMessage(bookingPostObj))
    // .then(window.alert(`Your booking was successful! We will see you on ${date}!`))
    // .catch(error => console.log(error.message));
  }
}

export default ApiController;
