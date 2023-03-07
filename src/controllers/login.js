import jwtLib from "jsonwebtoken";
import usersDB from "../database/database.js";

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

    //Mock service and database
    const userData = usersDB.filter((db) => email === db.email);

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

    const user = {
        email: req.body.email,
        password: req.body.password,
    };

    //Standardize response
    const response = {
        message: null,
        data: null,
        error: null,
    };

    //Mock service and database
    const userData = usersDB.filter(
        (db) => user.email === db.email && user.password === db.password
    );

    if (userData.length <= 0) {
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

const loginController = {
    getuserData: getuserData,
    createSession: createSession,
    deleteSession: deleteSession,
};

export default loginController;
