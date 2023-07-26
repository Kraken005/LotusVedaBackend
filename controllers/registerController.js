// const usersDB = {
//     users: require("../models/users.json"),
//     setUsers: function (data) {
//         this.users = data;
//     }
// }
const User = require('../models/Users');
// const fsPromises = require("fs").promises;
// const path = require("path");
const bcrypt = require('bcrypt');
//const { use } = require("../routes/userRoute");

const handleNewUser = async (req, res) => {
    const {user, pwd} = req.body;
    if(!user || !pwd) return res.status(400).json({message: "Username and password are required"})

    //Check duplicate
    const duplicate = await User.findOne({username: user}).exec();
    if(duplicate) return res.sendStatus(409);
    try {
        //encrypt message
        const hashedPwd = await bcrypt.hash(pwd, 10);
        //create and store new user
        const result = await User.create({
            "username": user, 
            "password": hashedPwd
        });
        console.log(result);
        // usersDB.setUsers([...usersDB.users, newUser]);
        // fsPromises.writeFile(path.join(__dirname, '..', 'models', 'users.json'),
        // JSON.stringify(usersDB.users));
        // console.log(usersDB.users);
        res.status(201).json({'success': `New user ${user} created`});
    } catch (error) {
        res.status(500).json({"message": error.message});
    }
}

module.exports = {handleNewUser};