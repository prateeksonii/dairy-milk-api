const { default: axios } = require("axios");
const dayjs = require("dayjs");
const { db } = require("../../db");
const { findFreeCapacityByDate } = require("./utils");

exports.addOrder = async (req, res, next) => {
  // #swagger.tags = ['order']

  try {
    const { capacity, status, customerName, customerPhone, destination } =
      req.body;

    const currentDateString = dayjs().format("YYYY-MM-DD");

    const freeCapacity = await findFreeCapacityByDate(currentDateString);

    if (freeCapacity === 0 || freeCapacity - capacity < 0) {
      res.status(400);
      throw new Error("Not enough capacity");
    }

    const order = await db.order.create({
      data: {
        capacity,
        status,
        customerName,
        customerPhone,
        destination,
        date: currentDateString,
      },
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
  // #swagger.tags = ['order']
  try {
    const { id } = req.params;
    const { capacity, status, customerName, customerPhone, destination } =
      req.body;

    const freeCapacity = await findFreeCapacityByDate(currentDateString);

    if (freeCapacity === 0 || freeCapacity - capacity < 0) {
      res.status(400);
      throw new Error("Not enough capacity");
    }

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
  // #swagger.tags = ['order']
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
  // #swagger.tags = ['order']
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
  // #swagger.tags = ['order']
  try {
    // Allowed format - YYYY-MM-DD
    const { date } = req.params;

    const freeCapacity = await findFreeCapacityByDate(date);

    return res.json({
      ok: true,
      capacity: freeCapacity,
    });
  } catch (err) {
    next(err);
  }
};
