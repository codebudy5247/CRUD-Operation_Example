const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");

const app = express();

const PORT = 5000;

app.use(express.json());

let users = [
  {
    userName: "Mark",
    email: "mark@example.com",
    password: "123456",
  },
  {
    userName: "Steve Smith",
    email: "steve@example.com",
    password: "123456",
  },
  {
    userName: "Jane Doe",
    email: "jane@example.com",
    password: "123456",
  },
  {
    userName: "John Doe",
    email: "john@example.com",
    password: "123456",
  },
];

//ROUTES

//Test
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

//Get users
app.get("/users", (request, response) => {
  response.json(users);
});


//REGISTER
app.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;
  const userExists = users.find((users) => users.email === email);

  if (userExists) {
    res.status(400).json({
      message: "User Already exist",
    });
  }
  const newdata = {
    userName,
    email,
    password,
  };
  console.log(newdata);
  const salt = await bcrypt.genSalt(10);
  newdata.password = await bcrypt.hash(password, salt);
  users.push(newdata);
  res.status(200).json(newdata);
});



app.listen(PORT, () => {
  console.log(`Server Up and running on PORT ${PORT}`);
});
