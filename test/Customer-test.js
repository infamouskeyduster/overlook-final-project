import { expect } from 'chai';
import Customer from '../src/Customer';

describe('Customer', function(){
  let rooms, bookings, today, id, customer;

  beforeEach(function(){
    rooms = [
      {
        number: 1,
        roomType: "residential suite",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 358.4
        },
        {
        number: 2,
        roomType: "suite",
        bidet: false,
        bedSize: "full",
        numBeds: 2,
        costPerNight: 477.38
        },
        {
        number: 3,
        roomType: "single room",
        bidet: false,
        bedSize: "king",
        numBeds: 1,
        costPerNight: 491.14
        },
    ];

    bookings = [
      {
           id: "5fwrgu4i7k55hl6t8",
           userID: 1,
           date: "2020/04/17",
           roomNumber: 1,
           roomServiceCharges: []
       },
       {
            id: "5fwrgu4i7k55hl6x8",
            userID: 1,
            date: "2020/01/11",
            roomNumber: 1,
            roomServiceCharges: []
        },
        {
            id: "5fwrgu4i7k55hl727",
            userID: 1,
            date: "2020/02/07",
            roomNumber: 1,
            roomServiceCharges: []
        },
        {
            id: "5fwrgu4i7k55hl6uf",
            userID: 2,
            date: "2020/02/07",
            roomNumber: 2,
            roomServiceCharges: []
        },
        {
            id: "5fwrgu4i7k55hl6v3",
            userID: 3,
            date: "2020/02/07",
            roomNumber: 3,
            roomServiceCharges: []
        },
    ];
    id = 1;
    today = "2020/02/07";
    customer = new Customer(id, rooms, bookings, today);
  });

  it('Should be an instance of the Customer class', function(){
    expect(customer).to.be.an.instanceof(Customer);
  });

  it('Should be able to find bookings for a customer based on the customer\'s ID', function(){
    expect(customer.myBookings).to.deep.equal([bookings[0],bookings[1],bookings[2]]);
  });

  it('Should be able to determine how much a customer has spent on rooms (past & present)', function(){
    expect(customer.findMyTotalSpent()).to.equal('You have spent a total of $1075.20 at The Grand Budapest Hotel.');
  });

});
