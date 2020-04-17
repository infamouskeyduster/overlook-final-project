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
}

export default ApiController;
