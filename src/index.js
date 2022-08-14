const swaggerAutogen = require("swagger-autogen")();

const swaggerDoc = {
  info: {
    title: "Dairy Milk Orders API",
  },
};

async function main() {
  await swaggerAutogen(
    "./swagger-output.json",
    ["./src/api/v1/router"],
    swaggerDoc
  );

  const app = require("./app");
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

main();
