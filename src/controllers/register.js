import jwtLib from "jsonwebtoken";
import fs from "fs";
import bcrypt from "bcrypt";

const TAG = "Register controller: ";

const registerUser = async (req, res) => {
    console.log(TAG, "registerUser()");

    //Repo
    //Get all users
    const usersDB = JSON.parse(
        fs.readFileSync("src/database/users.json", "utf8")
    );

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        type: req.body.type,
    };

    //Standardize response
    const response = {
        message: null,
        data: null,
        error: null,
    };

    //Service
    //Verify if user already exists
    usersDB.forEach((db) => {
        if (user.email === db.email) {
            response.message = `${user.email} is already registered`;
            response.error = `Unauthorized`;
        }
    });
    if (response.error) {
        res.status(400).json(response);
        return;
    }

    //Create new password hash
    const passwordHash = await bcrypt.hash(user.password, 10);
    user.password = passwordHash;

    //Repo
    //Write new user to the database
    usersDB.push({ ...user, id: setUserId(usersDB) });
    fs.writeFileSync("src/database/users.json", JSON.stringify(usersDB));

    response.message = `User ${user.email} registered successfully`;
    response.data = true;
    res.status(200).json(response);
};

function setUserId(users) {
    const biggestID = users.reduce((maxId, user) => {
        return user.id > maxId ? user.id : maxId;
    }, 0);
    return biggestID + 1;
}

const registerController = {
    registerUser: registerUser,
};

export default registerController;
