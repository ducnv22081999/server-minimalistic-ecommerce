const mongoose = require("mongoose");

const uri =
  "mongodb+srv://ducnv:1@rp-dev.ljfoi.mongodb.net/rp_minimalistic_ecommerce_dev";

async function connect() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect successfully!!!");
  } catch (error) {
    console.log("Connect failure!!!");
    console.log(error);
  }
}

module.exports = { connect };
