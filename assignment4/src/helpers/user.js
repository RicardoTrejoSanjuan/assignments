const { readFile, writeFile } = require('../data/DB');

const getAllUsers = () => {
    const users = readFile();
    return users.data ? users.data : [];
}

const getUserById = (id) => {
    let user = null;
    const users = readFile();
    if (users.data && users.data.length > 0) {
        user = users.data.find(user => user.id === id);
    }

    return user;
}

const addUser = (user) => {
    return new Promise((resolve, reject) => {
        const readUsers = readFile();
        let users = readUsers.data ? readUsers.data : [];
        const users2 = [...users, user];

        writeFile(users2).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    });
}

const updateUser = ({name, age, email}, id) => {
    return new Promise((resolve, reject) => {
        const allUsers = readFile();
        let users = allUsers.data.map((user) => {
            if (user.id === id) {
                user.name = name || user.name;
                user.age = age || user.age;
                user.email = email || user.email;
            }
            
            return user;
        });
        writeFile(users).then((result) => {
            resolve({
                status: 'Record updated successfully'
            });
        }).catch((err) => {
            reject(err);
        });
    });
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser
};

