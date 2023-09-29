const express = require("express");
const { get } = require("express/lib/response");
// import express from "express";
const app = express();
const port = 3000;
app.use(express.json());
const users = [];

//HTTP METHODS:
// create endpoints:
// GET -- retrieve data
app.get("/", (req, res) => {
  res.send("Welcome To Home");
});

app.get("/users", (req, res) => {
  if (users.length === 0) {
    res.status(404).send("NO USERS!");
    return;
  }
  res.status(200).send(users);
});
// POST -- Create Data
app.post("/users", (req, res) => {
  const user = req.body;
  const findUser = users.find((x) => user.id === x.id);
  if (findUser) {
    res.status(400).send("User already exist!");
    return;
  }
  users.push(req.body);
  res.status(201).send("Created!");
});
//PUT -- update data
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const findUserIndex = users.findIndex((x) => x.id === id);
  if (findUserIndex == -1) {
    res.status(400).send("User not found!");
    return;
  }
  users.splice(findUserIndex, 1);
  users.push(req.body);
  res.status(200).send("User updated successfully!");
});
//DELETE -- remove data
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const findUserIndex = users.findIndex((x) => x.id === id);
  if (findUserIndex == -1) {
    res.status(400).send("User not found!");
    return;
  }
  users.splice(findUserIndex, 1);
  res.status(200).send("User deleted successfully!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
