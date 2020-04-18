class CustomerRepo {
  constructor(allUsers) {
    this.allUsers = allUsers;
  }

  extractCustomerName(id) {
    let foundUser = this.allUsers.find(user => user.id === id);
    return foundUser.name;
  }
}

export default CustomerRepo;
