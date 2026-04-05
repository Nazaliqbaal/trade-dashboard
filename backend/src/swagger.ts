import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Real-Time Trading Dashboard API",
      version: "1.0.0",
      description: "REST API for live crypto ticker prices and historical data",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);