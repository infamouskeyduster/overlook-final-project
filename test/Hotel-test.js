import { expect } from 'chai';
import Hotel from '../src/Hotel';
import domUpdates from '../src/dom-updates';
const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

describe('Hotel', function(){
  let rooms, bookings, today, hotel;

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

    hotel = new Hotel(rooms, bookings, '2020/02/07');
  });

  it('Should be a new instance of Hotel class', function(){
    expect(hotel).to.be.an.instanceof(Hotel);
  });

  it('Should be instantiated with defualt properties: Rooms, Bookings, Today', function(){
    expect(hotel.rooms).to.deep.equal(rooms);
    expect(hotel.bookings).to.deep.equal(bookings);
    expect(hotel.today).to.equal('2020/02/07');
  });

  it('After the findAvailableRoomsToday() method is ran, these properties should be updated: hotel.totalRooms, hotel.availableRoomsQty', function(){
    hotel.findAvailableRoomsToday();
    expect(hotel.totalRooms).to.equal(3);
    expect(hotel.availableRoomsQty).to.equal(0);
  });

  it('Should be able to find the number of bookings on a given date', function(){
    expect(hotel.todaysBookingsQty).to.equal(3);
    hotel = new Hotel(rooms, bookings, '2020/04/17');
    expect(hotel.todaysBookingsQty).to.equal(1);
  });

  it('Should be able to return how many rooms are available on a specific date', function(){
    expect(hotel.findAvailableRoomsToday()).to.equal('There are 0 of 3 total rooms available today.');
    hotel = new Hotel(rooms, bookings, '2020/04/17');
    expect(hotel.findAvailableRoomsToday()).to.equal('There are 2 of 3 total rooms available today.');
  });

  it('Should be able to return the percentage of rooms occupied', function(){
    hotel.findAvailableRoomsToday();
    expect(hotel.calculatePercentageOfRoomsOccupiedToday()).to.equal('Today we have 100% of rooms occupied!');
    hotel = new Hotel(rooms, bookings, '2020/04/17');
    hotel.findAvailableRoomsToday();
    expect(hotel.calculatePercentageOfRoomsOccupiedToday()).to.equal('Today we have 33% of rooms occupied!');
    hotel = new Hotel(rooms, bookings, '2020/04/17');
    //Error handling if this.totalRooms && this.availableRooms has been redefined:
    expect(hotel.calculatePercentageOfRoomsOccupiedToday()).to.equal('The hotel cannot calculated the percentage of rooms without first calculating how many rooms it has & available rooms for the day');
  });

  it('Should be able to calculate the revenue for today (or a given day)', function(){
    expect(hotel.calculateTotalRevenueToday()).to.equal('The total revenue for 2020/02/07 is $1326.92.');
    hotel = new Hotel(rooms, bookings, '2020/04/17');
    expect(hotel.calculateTotalRevenueToday()).to.equal('The total revenue for 2020/04/17 is $358.40.');
  });

  it('Should be able to find an Array of Room Numbers that are booked on a certain date (not neccessarily today)', function(){
    expect(hotel.findBookingsByAnyDate('2020/02/07')).to.deep.equal([ 1, 2, 3 ]);
    expect(hotel.findBookingsByAnyDate('2020/04/20')).to.deep.equal([]);
  });

  it('After the findAvailableRoomsObjects(date) method is ran, the property hotel.availableRooms should be updated', function(){
    hotel.findAvailableRoomsObjects('2020/04/19');
    expect(hotel.availableRooms).to.deep.equal(hotel.rooms);
  });

  it('Should be able to return an array of Availble Room Objects', function(){
    let availbleRooms = [
      {
        number: 2,
        roomType: 'suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 477.38
      },
      {
        number: 3,
        roomType: 'single room',
        bidet: false,
        bedSize: 'king',
        numBeds: 1,
        costPerNight: 491.14
      }
    ]
    expect(hotel.findAvailableRoomsObjects('2020/04/17')).to.deep.equal(availbleRooms);
  });

  it('Should be able to find a scecific Room Object using the Room Number', function(){
    let foundRoom =
      {
        number: 2,
        roomType: 'suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 477.38
      }
    expect(hotel.retrieveSpecificRoomObjectUsingRoomNumber(2)).to.deep.equal(foundRoom);
  });

  it('Should be able to filter all available Rooms for a day based on the Room Type', function(){
    let availableRooms =
    [
      {
        number: 2,
        roomType: 'suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 477.38
      },
      {
        number: 3,
        roomType: 'single room',
        bidet: false,
        bedSize: 'king',
        numBeds: 1,
        costPerNight: 491.14
      }
  ];

  let availableRoomTypeAsSuite =
  [
    {
      number: 2,
      roomType: 'suite',
      bidet: false,
      bedSize: 'full',
      numBeds: 2,
      costPerNight: 477.38
    },
  ];

    hotel.findAvailableRoomsObjects('2020/04/17');
    expect(hotel.availableRooms).to.deep.equal(availableRooms);
    expect(hotel.filterAvailableRoomsByRoomType('suite')).to.deep.equal(availableRoomTypeAsSuite);
  });

});
