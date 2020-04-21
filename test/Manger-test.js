import { expect } from 'chai';
import Manager from '../src/Manager';
import domUpdates from '../src/dom-updates';
const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

describe('Manager', function(){
  let users, manager;
  beforeEach(function(){

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

    manager = new Manager(users);
  });

  it('Should be an instance of Manager', function(){
    expect(manager).to.be.an.instanceof(Manager);
  });

  it('Should be able to find a customer by First name.', function(){
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
    chai.spy.on(domUpdates, 'displayFoundCustomersBySearch', () => {});
    manager.searchCustomerByFirstOrLastName('ke');
    expect(domUpdates.displayFoundCustomersBySearch).to.have.been.called(1);
    expect(domUpdates.displayFoundCustomersBySearch).to.have.been.called.with(manager.foundCustomersWithSearch);
  });
});
