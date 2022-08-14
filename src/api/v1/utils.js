const { db } = require("../../db");

exports.findFreeCapacityByDate = async (date) => {
  const orders = await db.order.findMany({
    where: {
      date,
    },
  });

  const usedCapacity = orders.reduce((currentCapacity, order) => {
    return currentCapacity + order.capacity;
  }, 0);

  const freeCapacity = process.env.TOTAL_CAPACITY - usedCapacity;

  return freeCapacity;
};
