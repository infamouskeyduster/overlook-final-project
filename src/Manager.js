import Hotel from './Hotel';
import domUpdates from './dom-updates';

class Manager {
  constructor(users) {
    this.users = users;
    this.foundCustomersWithSearch = null;
  }

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
    if (this.foundCustomersWithSearch.length === 0) {
      window.alert('We\'re Sorry. Your search did not return any results! Please try again.' );
    }
    return allFoundCustomers;
  }

  displayFoundCustomers() {
    domUpdates.displayFoundCustomersBySearch(this.foundCustomersWithSearch);
  }
}

export default Manager;
