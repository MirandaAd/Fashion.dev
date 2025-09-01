import jwt from "jsonwebtoken";

// Middleware para proteger rutas
export const verifyToken = (req, res, next) => {
  const { token } = req.cookies;

  // Si no hay token, denegar acceso
  if (!token) return res.status(401).json({ message: "Autorización denegada" });

  // Verificar token con la SECRET_KEY
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Token no es válido" });

    // Guardamos la info del usuario en la request
    req.user = user;

    // Continuar con la siguiente función
    next();
  });
};
