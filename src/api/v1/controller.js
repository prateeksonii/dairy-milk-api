const { db } = require("../../db");

exports.addOrder = async (req, res, next) => {
  try {
    const { capacity, status, customerName, customerPhone, destination } =
      req.body;

    const order = await db.order.create({
      capacity,
      status,
      customerName,
      customerPhone,
      destination,
    });

    return res.status(201).json({
      ok: true,
      order,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { capacity, status, customerName, customerPhone, destination } =
      req.body;

    const order = await db.order.update({
      where: { id },
      data: {
        capacity,
        status,
        customerName,
        customerPhone,
        destination,
      },
    });

    return res.json({
      ok: true,
      order,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateStatusById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await db.order.update({
      where: { id },
      data: {
        status,
      },
    });

    return res.json({
      ok: true,
      order,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await db.order.delete({
      where: { id },
    });

    return res.json({
      ok: true,
      order,
    });
  } catch (err) {
    next(err);
  }
};

exports.checkCapacityByDate = async (req, res, next) => {
  try {
    const { date } = req.params;

    const orders = await db.order.findMany({
      where: {
        date,
      },
    });

    const usedCapacity = orders.reduce((currentCapacity, order) => {
      return currentCapacity + order.capacity;
    }, 0);

    const freeCapacity = process.env.TOTAL_CAPACITY - usedCapacity;

    return res.json({
      ok: true,
      capacity: freeCapacity,
    });
  } catch (err) {
    next(err);
  }
};
