import Comprador from "../models/comprador.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Registro de comprador
export const registerComprador = async (req, res) => {
  const { firstName, username, email, password } = req.body;

  try {
    // Hashear la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear nuevo comprador
    const newComprador = new Comprador({
      firstName,
      username,
      email,
      password: passwordHash
    });

    const compradorGuardado = await newComprador.save();

    // Generar token JWT
    jwt.sign(
      { id: compradorGuardado._id },
      process.env.SECRET_KEY,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) console.log(err);

        res.cookie("token", token, { httpOnly: true });
        res.json({
          id: compradorGuardado._id,
          firstName: compradorGuardado.firstName,
          username: compradorGuardado.username,
          email: compradorGuardado.email,
          createdAt: compradorGuardado.createdAt,
          updatedAt: compradorGuardado.updatedAt
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login de comprador
export const loginComprador = async (req, res) => {
  const { email, password } = req.body;

  try {
    const compradorEncontrado = await Comprador.findOne({ email });
    if (!compradorEncontrado) return res.status(400).json({ message: "Comprador no encontrado" });

    const isMatch = await bcrypt.compare(password, compradorEncontrado.password);
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

    jwt.sign(
      { id: compradorEncontrado._id },
      process.env.SECRET_KEY,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) console.log(err);

        res.cookie("token", token, { httpOnly: true });
        res.json({
          id: compradorEncontrado._id,
          firstName: compradorEncontrado.firstName,
          username: compradorEncontrado.username,
          email: compradorEncontrado.email,
          createdAt: compradorEncontrado.createdAt,
          updatedAt: compradorEncontrado.updatedAt
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout de comprador
export const logoutComprador = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  res.sendStatus(200);
};

// Obtener perfil del comprador
export const profileComprador = async (req, res) => {
  try {
    const compradorEncontrado = await Comprador.findById(req.user.id);
    if (!compradorEncontrado) return res.status(400).json({ message: "Comprador no encontrado" });

    res.json({
      id: compradorEncontrado._id,
      firstName: compradorEncontrado.firstName,
      username: compradorEncontrado.username,
      email: compradorEncontrado.email,
      createdAt: compradorEncontrado.createdAt,
      updatedAt: compradorEncontrado.updatedAt
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
