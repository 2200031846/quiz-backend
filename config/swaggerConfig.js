const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");

// ✅ Define Swagger Options for Dynamic API Documentation
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Quiz App API",
            description: "API Documentation for the Quiz Application",
            version: "1.0.0",
            contact: { name: "Developer", email: "developer@example.com" }
        },
        servers: [{ url: "http://quiz-backend-production-4024.up.railway.app" }]
    },
    apis: ["./routes/*.js"] // ✅ Scan all route files for documentation
};

// ✅ Generate Swagger Spec Dynamically
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// ✅ Check if `swagger.json` Exists (Static Documentation)
const swaggerJsonPath = path.join(__dirname, "../docs/swagger.json");
let swaggerDocument = swaggerSpec;

if (fs.existsSync(swaggerJsonPath)) {
    console.log("✅ Loading static `swagger.json`...");
    swaggerDocument = JSON.parse(fs.readFileSync(swaggerJsonPath, "utf-8"));
} else {
    console.log("⚠️ No static `swagger.json` found, using dynamically generated Swagger...");
}

// ✅ Setup Swagger UI in Express App
const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    console.log("✅ Swagger API Docs available at: http://quiz-backend-production-4024.up.railway.app/api-docs");
};

module.exports = setupSwagger;
