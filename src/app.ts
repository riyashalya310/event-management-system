import "reflect-metadata";
import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./inversify.config";

// Import all controllers (they will be automatically registered by inversify)
import "./controllers/event.controller";

const app = express();

// Create an instance of InversifyExpressServer
const server = new InversifyExpressServer(container);

server.setConfig((app) => {
    app.use(express.json());
});

// Start the server
const appInstance = server.build();
appInstance.listen(3000, () => {
    console.log("Server running on port 3000");
});
