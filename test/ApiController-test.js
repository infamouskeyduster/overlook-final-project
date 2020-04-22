import { expect } from 'chai';
import ApiController from '../src/api-controller';
import domUpdates from '../src/dom-updates';
const chai = require('chai');
const spies = require('chai-spies');
let fetch = {};
chai.use(spies);

describe('API Controller', function(){
  let apiController;
  beforeEach(function(){
    apiController = new ApiController();
  });

  it('Should be an instance of ApiController', function(){
    expect(apiController).to.be.an.instanceof(ApiController);
  });

  it.skip('Should spy on domUpdates.showBookingConfirmationMessage to verify that it fired after a successful POST request', function(){
    let bookingPostObj = {
      'userID': 7,
      'date': '2020/06/01',
      'roomNumber': 14,
    };

    chai.spy.on(domUpdates, 'showBookingConfirmationMessage', () => {});
    apiController.postBookingForCustomer(7, '2020/06/01', 14);
    expect(domUpdates.showBookingConfirmationMessage).to.have.been.called(1);
    expect(domUpdates.showBookingConfirmationMessage).to.have.been.called.with(bookingPostObj);
  });
});
