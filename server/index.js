let express = require("express");
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: "http://localhost:5173", // Allowed origin
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};
app.use(cors(corsOptions)); // Allow requests from http://localhost:5500/
app.use(express.json());

app.use("/", (req, res) => {
  console.log("Hello from root");
  res.json({ error: false, message: "Hello World" });
});

app.listen(5500, () => {
  console.log("Server is running on port 5500");
});
