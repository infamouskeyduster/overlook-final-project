import Hotel from './Hotel';
import domUpdates from './dom-updates';

class Manager {
  constructor(users) {
    this.users = users;
    this.foundCustomersWithSearch = null;
  }

  //What happens on the DOM side if we filter more that ONE user?
  //should we instantiate all found users?
  //OR should we have the user click the customer to then instantiate that customer???
  searchCustomerByFirstOrLastName(searchName) {
    let lowerCaseSearchName = searchName.toLowerCase();
    let allFoundCustomers =
    this.users.filter(user => {
      let lowerCaseName = user.name.toLowerCase();
      if (lowerCaseName.includes(lowerCaseSearchName)) {
        return user;
      };
    });
    this.foundCustomersWithSearch = allFoundCustomers;
    this.displayFoundCustomers(this.foundCustomersWithSearch);
    return allFoundCustomers;
  }

  displayFoundCustomers() {
    domUpdates.displayFoundCustomersBySearch(this.foundCustomersWithSearch);
  }
}

export default Manager;
