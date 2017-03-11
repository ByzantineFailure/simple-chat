// Eventually we'll use this to proxy redis
class Store {
    constructor() {
        this.__localData = {
            users: {}
        };

        // Paranoid 
        this.addUser = this.addUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
    }

    addUser(id, user) {
        this.__localData.users[id] = user; 
    }
    removeUser(id) {
        delete this.__localData.users[id];
    }
    getAllUsers() {
        return this.__localData.users;
    }
    persistMessage(message) {
        // Currently a no-op, future expansion point in the event of something like a redis instance
    }
}

module.exports = Store;

