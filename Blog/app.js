const express = require("express");
const mongoose = require("mongoose");
const Node = require("./models/blog");
const fs = require("fs");
const { urlencoded } = require("express");
const app = express();
const dbUrl =
  "mongodb+srv://Alex:Bolt@cluster0.liqpl.mongodb.net/node?retryWrites=true&w=majority";

mongoose
  .connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((res) => app.listen(3000))
  .catch((err) => console.log("There was an error during the Runtime 👹"));
app.set("view engine", "ejs");
app.use(express.static("public")); 
app.use(urlencoded());
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/blogs", (req, res) => {
  Node.find()
    .then((result) => {
      res.render("index", { title: "Home", blogs: result });
    })
    .catch((err) => console.log("There was an error during the Runtime 👹"));
});
app.post("/blogs", (req, res) => {
  console.log(req.body);
  const blog = new Node(req.body);
  blog
    .save()
    .then((data) => res.redirect("/blogs"))
    .catch((err) =>
      console.log("There was an error during the Runtime 👹 line 34")
    );
});
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Node.findById(id)
    .then((result) => {
      console.log(result);
      res.render("details", { blog: result, title: result.title });
    })
    .catch((err) =>
      console.log("There was an error during the Runtime 👹 from line 43")
    );
});
app.delete("/blogs/:id", (res, req) => {
  const id = req.params.id;
  console.log(id);
  Node.findByIdAndDelete(id).then((result) => {});
});

app.get("/create", (req, res) => {
  res.render("create", { title: "New Blog" });
});
app.use((req, res) => {
  res.status(404).render("404", { title: "404 !!" });
});
