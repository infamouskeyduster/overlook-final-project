import { expect } from 'chai';
import Manager from '../src/Manager';
import Customer from '../src/Customer';
import ApiController from '../src/api-controller';
import domUpdates from '../src/dom-updates';
const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

describe('Manager', function(){
  // afterEach(function(){
  //   chai.spy.restore(domUpdates);
  // });

  let users, manager, bookings, today, currentCustomer, rooms, apiController;
  beforeEach(function(){
    // chai.spy.on(domUpdates, 'displayFoundCustomersBySearch');
    users = [
      {
          "id": 1,
          "name": "Leatha Ullrich"
      },
      {
          "id": 2,
          "name": "Rocio Schuster"
      },
      {
          "id": 3,
          "name": "Kelvin Schiller"
      },
      {
          "id": 4,
          "name": "Kennedi Emard"
      },
      {
          "id": 5,
          "name": "Rhiannon Little"
      },
    ];

    bookings = [
      {
        "id": "5fwrgu4i7k55hl6sz",
        "userID": 2,
        "date": "2020/04/22",
        "roomNumber": 15,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6t5",
        "userID": 2,
        "date": "2020/04/23",
        "roomNumber": 24,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6t6",
        "userID": 13,
        "date": "2020/01/10",
        "roomNumber": 12,
        "roomServiceCharges": []
      },
    ];

    rooms = [
      {
        "number": 24,
        "roomType": "suite",
        "bidet": false,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 327.24
      },
      {
        "number": 15,
        "roomType": "residential suite",
        "bidet": false,
        "bedSize": "full",
        "numBeds": 1,
        "costPerNight": 294.56
      },
      {
        "number": 12,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "twin",
        "numBeds": 2,
        "costPerNight": 172.09
      },
    ];

    today = "2020/04/21";
    manager = new Manager(users, bookings, today);
    currentCustomer = new Customer(2, rooms, bookings, today);
    apiController = new ApiController();
  });

  it('Should be an instance of Manager', function(){
    expect(manager).to.be.an.instanceof(Manager);
  });

  it('Should be instantiated with correct default properties', function(){
    expect(manager.users).to.deep.equal(users);
    expect(manager.bookings).to.deep.equal(bookings);
    expect(manager.today).to.deep.equal(today);
  });


  it('Should spy on domUpdates.displayFoundCustomersBySearch to make sure it is being called', function(){
    chai.spy.on(domUpdates, 'displayFoundCustomersBySearch', () => true);
    expect(domUpdates.displayFoundCustomersBySearch()).to.equal(true);
  });

  it('Should return the correct customer on the search', function(){
    expect(manager.searchCustomerByFirstOrLastName('Kennedi')).to.deep.equal([{ id: 4, name: 'Kennedi Emard' }]);
  });

  it('Should be able to find a customer by Last name', function(){
    expect(manager.searchCustomerByFirstOrLastName('Schuster')).to.deep.equal([{ id: 2, name: 'Rocio Schuster' }]);
  });

  it('Should be able to find a customer by Partial name search', function(){
    let foundCustomers = [
      {
          "id": 3,
          "name": "Kelvin Schiller"
      },
      {
          "id": 4,
          "name": "Kennedi Emard"
      },
    ];
    expect(manager.searchCustomerByFirstOrLastName('ke')).to.deep.equal(foundCustomers);
  });

  it('Should spy on domUpdates.displayFoundCustomersBySearch to verify that it fired after search has been returned', function(){
    manager.searchCustomerByFirstOrLastName('ke');
    expect(domUpdates.displayFoundCustomersBySearch).to.have.been.called(5);
    expect(domUpdates.displayFoundCustomersBySearch).to.have.been.called.with(manager.foundCustomersWithSearch);
  });

  it('Should spy on domUpdates.displayFutureBookingsForCustomer', function(){
    chai.spy.on(domUpdates, 'displayCustomerBookingInFuture', () => true);
    expect(domUpdates.displayFoundCustomersBySearch()).to.equal(true);
  });

  it('Should be able to find all customer bookings in the Future', function(){
    let foundFutureBookings = [
      {
        id: '5fwrgu4i7k55hl6sz',
        userID: 2,
        date: '2020/04/22',
        roomNumber: 15,
        roomServiceCharges: []
      },
      {
        id: '5fwrgu4i7k55hl6t5',
        userID: 2,
        date: '2020/04/23',
        roomNumber: 24,
        roomServiceCharges: []
      }
    ];
    expect(manager.findCustomerBookingsInFuture(currentCustomer)).to.deep.equal(foundFutureBookings);
    expect(domUpdates.displayCustomerBookingInFuture).to.have.been.called(1);
    expect(domUpdates.displayCustomerBookingInFuture).to.have.been.called.with(currentCustomer, foundFutureBookings);
  });
});
