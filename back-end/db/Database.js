const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(
    `mongodb+srv://hamiltonpoko25:pokohamilton@cluster0.44ke9f2.mongodb.net/`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((data) => {
    console.log(`MongoDB connected with server: ${data.connection.host}`);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
};

module.exports = connectDatabase;

