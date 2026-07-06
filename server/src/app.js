import "dotenv/config";

import express from "express";
import cors from "cors";
import multer from "multer";

import moduleName from 'module'

const app = express();

// MIDDLEWARES

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().none());

// ROUTES

app.use("/api/v1/employee", );

export default app;
