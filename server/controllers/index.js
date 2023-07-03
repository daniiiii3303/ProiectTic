const prescriptions = require("./prescriptions");
const medicines = require("./medicines");
const users = require("./users");

const controllers = {
    prescriptions,
    users,
    medicines,
};

module.exports = controllers;