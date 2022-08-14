const { z } = require("zod");

exports.addOrderValidator = z.object({
  body: z.object({
    capacity: z.number(),
    status: z.enum(["placed", "packed", "dispatched", "delivered"]),
    customerName: z.string(),
    customerPhone: z.string(),
    destination: z.string(),
  }),
});

exports.updateOrderValidator = z.object({
  params: z.object({
    id: z.number(),
  }),
  body: z.object({
    capacity: z.number(),
    status: z.enum(["placed", "packed", "dispatched", "delivered"]),
    customerName: z.string(),
    customerPhone: z.string(),
    destination: z.string(),
  }),
});

exports.updateStatusValidator = z.object({
  params: z.object({
    id: z.number(),
  }),
  body: z.object({
    status: z.enum(["placed", "packed", "dispatched", "delivered"]),
  }),
});

exports.deleteOrderValidator = z.object({
  params: z.object({
    id: z.number(),
  }),
});

exports.checkCapacityValidator = z.object({
  params: z.object({
    date: z.string(),
  }),
});
