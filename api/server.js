const express = require("express");

const app = express();

const PORT = 5000;

app.use(express.json());

let users = [
  {
    id: 1,
    firstName: "Mark",
    lastName: "Brown",
    "email":"mark@example.com",
    password: "123456",
  },
  {
    id: 2,
    firstName: "Steve",
    lastName: "Smith",
    "email":"steve@example.com",
    password: "123456",
  },
  {
    id: 3,
    firstName: "Jane",
    lastName: "Doe",
    "email":"jane@example.com",
    password: "123456",
  },
  {
    id: 4,
    firstName: "John",
    lastName: "Doe",
    "email":"john@example.com",
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

//Get users by id
app.get("/users/:id", (request, response) => {
  const accountId = Number(request.params.id);
  const getUsers = users.find((users) => users.id === accountId);

  if (!getUsers) {
    response.status(500).send("Account not found.");
  } else {
    response.json(getUsers);
  }
});

app.post("/users", (request, response) => {
  const registerUser = request.body;

  users.push(registerUser);

  response.json(users);
});

app.put("/users/:id", (request, response) => {
  const userId = Number(request.params.id);
  const body = request.body;
  const user = users.find((users) => users.id === userId);
  const index = users.indexOf(users);

  if (!users) {
    response.status(500).send("User not found.");
  } else {
    const updatedUser = { ...user, ...body };

    users[index] = updatedUser;

    response.send(updatedUser);
  }
});

app.listen(PORT, () => {
  console.log(`Server Up and running on PORT ${PORT}`);
});
