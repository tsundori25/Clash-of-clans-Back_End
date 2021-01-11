const mongoose = require("mongoose");

module.exports = () => {
    const MONGODBURI = "mongodb://localhost/clashVillage";

    mongoose.connect(MONGODBURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

    const db = mongoose.connection;
    db.on("error", (error) => console.log(error));
    db.once("open", () => {
        console.log("connected to mongodb, from", MONGODBURI);
    });
};