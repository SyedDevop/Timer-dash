import express from "express";
const PORT = process.env.PORT || 3001;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
  "feat(server): add node.js and typeScript backend to the application. ";
  "BREAKING CHANGE: file structure has changed";
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});