import { connection } from "../db/db.connection.js";
export const saveBugReport = async (req, res) => {
  const { title, report_name, status, message } = req.body;

  if (!title || !report_name || !message) {
    return res
      .status(400)
      .json({ message: "Title, report name, and message are required" });
  }

  const query = `
    INSERT INTO bug_reports (title, report_name, status, message)
    VALUES (?, ?, ?, ?)
  `;

  try {
    await connection.execute(query, [
      title,
      report_name,
      status || "Pending",
      message,
    ]);

    return res.status(201).json({
      success: true,
      message: "Bug report saved successfully",
    });
  } catch (err) {
    console.error("Error al guardar el reporte:", err);
    return res
      .status(500)
      .json({ success: false, message: "Error while saving bug report" });
  }
};
export const getAllBugReports = async (req, res) => {
  const result = await connection.execute("select * from bug_reports");
  res.json(result.rows);
};

export const createUser = async (req, res) => {
  const { usuario, code } = req.body;
  if (!usuario || !code) {
    return res.status(400).json({ message: "Usuario y código son requeridos" });
  }

  const query = "INSERT INTO login (usuario, code) VALUES (?, ?)";

  try {
    const results = await connection.execute(query, [usuario, code]);
    res.status(201).json({
      message: "Usuario creado con éxito",
      data: {
        id: results.insertId,
        usuario,
      },
    });
  } catch (err) {
    console.error("Error al crear el usuario:", err);
    res
      .status(500)
      .json({ message: "Error al crear el usuario", error: err.message });
  }
};
export const loginUser = async (req, res) => {
  const { usuario, code } = req.body;

  if (!usuario || !code) {
    return res.status(400).json({ message: "Usuario y código son requeridos" });
  }

  const query = "SELECT usuario FROM login WHERE usuario = ? AND code = ?";

  try {
    const result = await connection.execute(query, [usuario, code]);
    if (!result.rows || result.rows.length === 0) {
      return res.status(401).json({ message: "Usuario o código incorrecto" });
    }

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      data: {
        usuario: result.rows[0].usuario,
      },
    });
  } catch (err) {
    console.error("Error al iniciar sesión:", err);
    res
      .status(500)
      .json({ message: "Error al iniciar sesión", error: err.message });
  }
};

export const getUser = async (req, res) => {
  const result = await connection.execute("select * from login");
  res.json(result.rows);
};
