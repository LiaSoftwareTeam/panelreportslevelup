import { connection } from "../db/db.connection.js";

export const saveBugReport = (req, res) => {
  const { title, report_name, status, message } = req.body; // Recibiendo los datos necesarios para el reporte

  // Validar que todos los campos requeridos estén presentes
  if (!title || !report_name || !message) {
    return res
      .status(400)
      .json({ message: "Title, report name, and message are required" });
  }

  // Consulta SQL para insertar el reporte de bug
  const query = `
    INSERT INTO bug_reports (title, report_name, status, message)
    VALUES (?, ?, ?, ?)
  `;

  // Ejecutar la consulta
  connection.execute(
    query,
    [title, report_name, status || "Pending", message],
    (err, results) => {
      if (err) {
        console.error("Error al guardar el reporte:", err);
        return res
          .status(500)
          .json({ message: "Error while saving bug report", error: err });
      }

      // Imprimir en consola el estado de la operación
      console.log(
        `Reporte de bug con ID ${results.insertId} guardado exitosamente`
      );

      // Responder con el estado de la operación
      res.status(201).json({
        message: "Bug report saved successfully",
        data: {
          id: results.insertId, // ID generado automáticamente por la base de datos
          title,
          report_name,
          status: status || "Pending",
          message,
        },
      });
    }
  );
};

export const getAllBugReports = async (req, res) => {
  const result = await connection.execute("select * from bug_reports");
  res.json(result.rows);
};
