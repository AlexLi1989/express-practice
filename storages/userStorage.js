// This class lets us simulate interacting with a database.
class UsersStorage {
  constructor() {
    this.storage = {};
    this.id = 0;
  }

  addUser({ firstName, lastName, email, age = null, bio = null }) {
    const id = this.id;
    this.storage[id] = { id, firstName, lastName, email, age, bio };
    this.id++;
  }

  getUsers() {
    return Object.values(this.storage);
  }

  getUser(id) {
    return this.storage[Number(id)];
  }

  updateUser(id, updatedFields) {
    this.storage[Number(id)] = {
      ...this.storage[Number(id)],
      ...updatedFields,
    };
  }

  deleteUser(id) {
    delete this.storage[Number(id)];
  }

  searchUser({ name, email }) {
    const users = this.getUsers();
    return users.filter((user) => {
      //search email logic
      const matchEmail = email && user.email === email;
      //search name logic
      let matchName = false;
      if (name) {
        const searchName = name.trim().toLowerCase();
        const fullname =
          user.firstName.toLowerCase() + " " + user.lastName.toLowerCase();
        matchName = fullname.includes(searchName);
      }
      return matchEmail || matchName;
    });
  }
}

// Rather than exporting the class, we can export an instance of the class by instantiating it.
// This ensures only one instance of this class can exist, also known as the "singleton" pattern.
module.exports = new UsersStorage();
