const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const Chance = require("chance");
const router = require("./routes");
const { db } = require("./config/firebase-admin");
const firebase = require("firebase/app");

var chance = new Chance();

const firebaseConfig = {
    apiKey: "AIzaSyDdOSHfGJ9BxP_AQe9bPjYmSCm0Dgu4mbQ",
    authDomain: "tic-project-a48e3.firebaseapp.com",
    projectId: "tic-project-a48e3",
    storageBucket: "tic-project-a48e3.appspot.com",
    messagingSenderId: "195902265542",
    appId: "1:195902265542:web:832b08d65f0e822eb2dfc7"
};

firebase.initializeApp(firebaseConfig);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const logger = require("morgan");

app.use(logger("dev"));

app.use("/api", router);


app.get("/reset", async (req, res) => {
    db.collection("prescriptions")
        .get()
        .then((querySnapshot) => {
            querySnapshot.docs.forEach((snapshot) => {
                console.log(snapshot.id);
                db.collection("prescriptions").doc(snapshot.id).delete();
            });
            for (let i = 0; i < 2; i++) {
                db.collection("prescriptions")
                    .add({
                        title: chance.title(),
                        description: chance.description(),
                    })
                    .then((ref) => {
                        for (let j = 0; j < 2; j++) {
                            const medicines = chance.pickone([
                                "nurofen",
                                "paracetamol",
                                "diclac gel",
                                "algocalmin"
                            ]);
                            db.collection("prescriptions")
                                .doc(ref.id)
                                .collection("medicines")
                                .add({
                                    title: chance.title(),
                                    description: chance.description(),
                                    medicines: medicines,
                                });
                        }
                    })
                    .catch((err) => {
                        return res.status(500).json({ message: err.message });
                    });
            }

            return res
                .status(200)
                .json({ message: "Data was reseted successfully!" });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({ message: err.message });
        });
});



app.get("/", (req, res) => {
    res.status(200);
    res.send("Server is running");
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});