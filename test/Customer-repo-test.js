import { expect } from 'chai';
import CustomerRepo from '../src/Customer-repo';

describe('CustomerRepo', function(){
  let allUsers, customerRepo;

  beforeEach(function(){
    allUsers = [
      {
        id: 1,
        name: "Leatha Ullrich"
      },
      {
        id: 2,
        name: "Rocio Schuster"
      },
      {
        id: 3,
        name: "Kelvin Schiller"
      },
      {
        id: 4,
        name: "Kennedi Emard"
      },
    ];

    customerRepo = new CustomerRepo(allUsers);
  });

  it('Should be a new instance of CustomerRepo class', function(){
    expect(new CustomerRepo()).to.be.an.instanceof(CustomerRepo);
  });

  it('Should be able to extract a customer\'s name given their ID', function(){
    expect(customerRepo.extractCustomerName(4)).to.equal("Kennedi Emard");
  });
});
