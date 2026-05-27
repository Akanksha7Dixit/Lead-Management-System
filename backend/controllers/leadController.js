const pool = require("../config/db");


// ADD LEAD
const addLead = async (req, res) => {

  try {

    const { name, phone, source } = req.body;

    if (!name || !phone || !source) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO leads (name, phone, source)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [name, phone, source]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {

    console.error(error.message);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// GET LEADS
const getLeads = async (req, res) => {

  try {

    const result = await pool.query(
      `
      SELECT * FROM leads
      ORDER BY id DESC
      `
    );

    res.json(result.rows);

  } catch (error) {

    console.error(error.message);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// UPDATE STATUS
const updateLeadStatus = async (req, res) => {

  try {

    const { id } = req.params;
    const { status } = req.body;

    await pool.query(
      `
      UPDATE leads
      SET status = $1
      WHERE id = $2
      `,
      [status, id]
    );

    res.json({
      message: "Lead status updated",
    });

  } catch (error) {

    console.error(error.message);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// DELETE LEAD
const deleteLead = async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(
      `
      DELETE FROM leads
      WHERE id = $1
      `,
      [id]
    );

    res.json({
      message: "Lead deleted",
    });

  } catch (error) {

    console.error(error.message);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


module.exports = {
  addLead,
  getLeads,
  updateLeadStatus,
  deleteLead,
};