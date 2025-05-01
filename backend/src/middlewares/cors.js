const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true, // Set to true if your frontend sends cookies or authorization headers
  optionSuccessStatus: 200,
};

module.exports = cors(corsOptions);
