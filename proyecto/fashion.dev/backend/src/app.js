import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";


// Rutas
import authRoutes from "./routes/auth.routes.js";
import compradoresRoutes from "./routes/compradores.routes.js"; // ruta correcta

dotenv.config({ path: path.resolve('../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

console.log("MONGO_URI:", process.env.MONGO_URI);


app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/compradores", compradoresRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Atlas conectado"))
  .catch(err => console.log("Error MongoDB Atlas:", err));

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

