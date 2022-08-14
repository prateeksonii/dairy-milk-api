const swaggerAutogen = require("swagger-autogen")();

const swaggerDoc = {
  info: {
    title: "Dairy Milk Orders API",
  },
  basePath: "/api/v1",
};

swaggerAutogen("./swagger-output.json", ["./src/api/v1/router"], swaggerDoc);
