const { validate } = require("./middlewares");
const {
  addOrder,
  deleteOrderById,
  updateOrderById,
  updateStatusById,
  checkCapacityByDate,
} = require("./controllers");
const {
  addOrderValidator,
  updateOrderValidator,
  deleteOrderValidator,
  updateStatusValidator,
  checkCapacityValidator,
} = require("./validators");

const router = require("express").Router();

router.post("/add", validate(addOrderValidator), addOrder);
router.put("/update/:id", validate(updateOrderValidator), updateOrderById);
router.delete("/delete/:id", validate(deleteOrderValidator), deleteOrderById);
router.patch(
  "/updateStatus/:id",
  validate(updateStatusValidator),
  updateStatusById
);
router.get(
  "/checkCapacity/:date",
  validate(checkCapacityValidator),
  checkCapacityByDate
);

module.exports = router;
