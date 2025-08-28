import Alumno from "../models/AlumnoModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTRO DE ALUMNO
export const registerAlumno = async (req, res) => {
  const { firstName, username, email, password } = req.body;

  try {
    // 1. Cifrar la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // 2. Crear instancia del modelo Alumno
    const nuevoAlumno = new Alumno({
      firstName,
      username,
      email,
      password: passwordHash
    });

    // 3. Guardar en la base de datos
    const alumnoGuardado = await nuevoAlumno.save();

    // 4. Generar JWT
    jwt.sign(
      { id: alumnoGuardado._id },
      process.env.SECRET_KEY,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) console.log(err);

        // 5. Guardar token en cookie y responder
        res.cookie("token", token, { httpOnly: true });
        res.json({
          id: alumnoGuardado._id,
          firstName: alumnoGuardado.firstName,
          username: alumnoGuardado.username,
          email: alumnoGuardado.email,
          createdAt: alumnoGuardado.createdAt,
          updatedAt: alumnoGuardado.updatedAt
        });
      }
    );

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN DE ALUMNO
export const loginAlumno = async (req, res) => {
  const { email, password } = req.body;

  try {
    const alumnoEncontrado = await Alumno.findOne({ email });
    if (!alumnoEncontrado)
      return res.status(400).json({ message: "Alumno no encontrado" });

    const isMatch = await bcrypt.compare(password, alumnoEncontrado.password);
    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    jwt.sign(
      { id: alumnoEncontrado._id },
      process.env.SECRET_KEY,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) console.log(err);
        res.cookie("token", token, { httpOnly: true });
        res.json({
          id: alumnoEncontrado._id,
          firstName: alumnoEncontrado.firstName,
          username: alumnoEncontrado.username,
          email: alumnoEncontrado.email,
          createdAt: alumnoEncontrado.createdAt,
          updatedAt: alumnoEncontrado.updatedAt
        });
      }
    );

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGOUT
export const logoutAlumno = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

// PERFIL DEL ALUMNO
export const profileAlumno = async (req, res) => {
  const alumnoEncontrado = await Alumno.findById(req.user.id);
  if (!alumnoEncontrado)
    return res.status(400).json({ message: "Alumno no encontrado" });

  return res.json({
    id: alumnoEncontrado._id,
    firstName: alumnoEncontrado.firstName,
    username: alumnoEncontrado.username,
    email: alumnoEncontrado.email,
    createdAt: alumnoEncontrado.createdAt,
    updatedAt: alumnoEncontrado.updatedAt
  });
};