import jwtLib from "jsonwebtoken";
import bcrypt from "bcrypt";
import fs from "fs";

const TAG = "Login controller: ";

const getuserData = async (req, res) => {
    console.log(TAG, "createSession()");

    const email = req.params.email;

    //Standardize response
    const response = {
        message: null,
        data: null,
        error: null,
    };

    //Repo
    //Get all users
    const usersDB = JSON.parse(
        fs.readFileSync("src/database/users.json", "utf8")
    );
    const userData = usersDB.filter((db) => email === db.email);

    //Service
    //Verify if user exists
    if (userData.length <= 0) {
        response.message = "User is not registered";
        response.error = "Not found";
        res.status(404).json(response);
        return;
    }

    response.message = "User data retrieved successfully";
    response.data = {
        id: userData[0].id,
        name: userData[0].name,
        email: userData[0].email,
        type: userData[0].type,
    };

    res.status(200).json(response);
};

const createSession = async (req, res) => {
    console.log(TAG, "createSession()");

    //Standardize response
    const response = {
        message: null,
        data: null,
        error: null,
    };

    const user = {
        email: req.body.email,
        password: req.body.password,
    };

    //Repo
    //Get all users
    const usersDB = JSON.parse(
        fs.readFileSync("src/database/users.json", "utf8")
    );

    //Service
    //Verify if user exists
    let found = false;
    usersDB.forEach((db) => {
        if (user.email === db.email) {
            found = true;
        }
    });
    if (!found) {
        response.message = `Invalid credentials`;
        response.error = `Unauthorized`;
        res.status(400).json(response);
        return;
    }

    //Service
    //Check if submitted password matches db hash
    if (!(await checkUser(user, usersDB))) {
        response.message = "Invalid credentials";
        response.data = false;
        response.error = "Unauthorized";
        res.status(401).json(response);
        return;
    }

    const jwt = jwtLib.sign({ user: user.email }, process.env.JWTSECRET, {
        expiresIn: "300",
    });
    res.cookie("email:" + user.email, jwt);

    response.message = "User logged in successfully";
    response.data = true;

    res.status(200).json(response);
};

const deleteSession = async (req, res) => {
    console.log(TAG, "deleteSession()");

    const email = req.body.email;

    // Standardize response
    const response = {
        message: "",
        data: null,
        error: null,
    };

    res.clearCookie("email:" + email);
    response.message = "Cookie cleared successfully.";
    response.data = true;
    res.status(200).json(response);
};

async function checkUser(user, usersDB) {
    try {
        const plainTextPassword = user.password;
        const dbEntry = usersDB.find((db) => db.email === user.email);
        const result = bcrypt.compare(plainTextPassword, dbEntry.password);
        return result;
    } catch (error) {
        console.log(TAG, "error caught");
        throw error;
    }
}

const loginController = {
    getuserData: getuserData,
    createSession: createSession,
    deleteSession: deleteSession,
};

export default loginController;
