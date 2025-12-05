const router = require("express").Router();
const users = require("./users");
const clothingItem = require("./clothingItem");

router.use("/users", users);

router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(404).send({ message: "Router not found" });
});

module.exports = router;
