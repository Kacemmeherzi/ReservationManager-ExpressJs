const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description: "A simple Express API with Swagger documentation",
    },
  },
  apis: ["./routes/*.js", "./controllers/*js"], // Path to the API routes in your project
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
