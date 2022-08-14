const {
  addOrder,
  deleteOrderById,
  updateOrderById,
  updateStatusById,
  checkCapacityByDate,
} = require("./controller");

const router = require("express").Router();

router.post("/add", addOrder);
router.put("/update/:id", updateOrderById);
router.delete("/delete/:id", deleteOrderById);
router.patch("/updateStatus/:id", updateStatusById);
router.get("/checkCapacity/:id", checkCapacityByDate);

module.exports = router;
