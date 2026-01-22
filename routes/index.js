const router = require("express").Router();
const users = require("./users");
const clothingItem = require("./clothingItem");
const { ERROR_TYPES } = require("../utils/error");

router.use("/users", users);

router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(ERROR_TYPES.NOT_FOUND.statusCode)
                  .send({ message: ERROR_TYPES.NOT_FOUND.message });
});

module.exports = router;
