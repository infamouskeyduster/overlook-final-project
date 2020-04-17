class CustomerRepo {
  constructor(allUsers) {
    this.allUsers = allUsers;
  }

  extractCustomerName(id) {
    this.allUsers.find(user => {
      if (user.id === id) {
        return user.name;
      }
    })
  }
}

export default CustomerRepo;
