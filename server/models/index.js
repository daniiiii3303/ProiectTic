const { db } = require("../config/firebase-admin");

const prescriptions = db.collection("prescriptions");
const users = db.collection("users");

module.exports = {
    prescriptions,
    users,
};