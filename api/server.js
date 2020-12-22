const express = require("express");
const bcrypt = require("bcryptjs");
const path = require('path')
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const auth = require('./middleware/jwtAuth')

const app = express();

const PORT = 5000;

app.use(express.json());


//DATA
let users = [
  {
    userName: "Mark",
    email: "mark@example.com",
    password: bcrypt.hashSync('123456',10),
  },
  {
    userName: "Steve Smith",
    email: "steve@example.com",
    password: bcrypt.hashSync('123456',10),
  },
  {
    userName: "Jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync('123456',10),
  },
  {
    userName: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync('123456',10)
  },
  {
    "userName": "Captain Marvel",
    "email": "captain@example.com",
    "password": bcrypt.hashSync('123456',10)
  }
];

//ROUTES

//Test
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

//Get users
app.get("/users", auth,(request, response) => {
  response.json(users);
});

//Get a secret page
app.get('/secret',auth,(req,res)=>{
   res.sendFile(path.join(__dirname,'./public/index.html'))
})

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

//LOGIN
app.post("/login", async (req, res) => {
  const { email } = req.body;
  //Checking email
  const user = users.find((users) => users.email === email);
  if (!user) return res.status(400).send("Email is not found");

  //Checking password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  console.log(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid Password");

  //Create and assign a token
  const token = jwt.sign(
    {
      _id: user._id,
    },
    "abc123",
    {
      expiresIn: "1h",
    }
  );
  res.send(token);
});

app.listen(PORT, () => {
  console.log(`Server Up and running on PORT ${PORT}`);
});
